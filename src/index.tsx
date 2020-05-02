import React, { FunctionComponent, useReducer } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'
import { PayloadAction, Reducer } from '@reduxjs/toolkit'

// TODO: Allow reducers to throw on invalid action?
// TODO: Types on dispatch as well?
// TODO: Remove dependence on @reduxjs/toolkit

type SliceToInitialState<
  Slice extends { name: PropertyKey; reducer: Reducer }
> = {
  [K in Slice['name']]: ReturnType<Extract<Slice, { name: K }>['reducer']>
}

export function createStore<
  Name extends PropertyKey,
  Slices extends Array<{ name: Name; reducer: Reducer }>
>(slices: Slices | []) {
  const initialState = {} as SliceToInitialState<Slices[number]>
  const finalReducers = {} as any

  for (const slice of slices) {
    initialState[slice.name] = slice.reducer(void 0, {} as any)
    finalReducers[slice.name] = slice.reducer
  }

  const rootReducer = (
    state: typeof initialState,
    action: PayloadAction<any>
  ) => {
    let hasStateChanged = false
    let newState = {} as typeof initialState
    let nextStateForCurrentKey = {} as typeof initialState
    for (const slice of slices) {
      const currentReducer = finalReducers[slice.name]
      const prevStateForCurrentKey = state[slice.name]
      nextStateForCurrentKey = currentReducer(prevStateForCurrentKey, action)
      hasStateChanged =
        hasStateChanged || nextStateForCurrentKey !== prevStateForCurrentKey
      //@ts-ignore
      newState[slice.name] = nextStateForCurrentKey
    }
    return hasStateChanged ? newState : state
  }

  const Store = createContext({
    state: initialState,
    dispatch: (action: PayloadAction<any>): void => void 0,
  })

  function useSelector<T>(selector: (state: typeof initialState) => T) {
    return useContextSelector(Store, store => selector(store.state))
  }

  function useDispatch() {
    return useContextSelector(Store, store => store.dispatch)
  }

  const StateProvider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    return (
      <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    )
  }

  return {
    StateProvider,
    useSelector,
    useDispatch,
    Store,
    initialState,
    rootReducer,
  }
}

export { createSlice, PayloadAction } from '@reduxjs/toolkit'
