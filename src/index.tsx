import React, { FunctionComponent, useReducer } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'
import { PayloadAction, Reducer } from '@reduxjs/toolkit'

//? Types on dispatch as well?
// Since the action types append string literals together, we won't be able to create these types (yet)
// https://github.com/microsoft/TypeScript/issues/12754

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
  const reducers = {} as any

  for (const slice of slices) {
    initialState[slice.name] = slice.reducer(void 0, {} as any)
    reducers[slice.name] = slice.reducer
  }

  const rootReducer = (
    state: typeof initialState,
    action: PayloadAction<any>
  ) => {
    const newState = {} as typeof initialState
    for (const { name } of slices) {
      newState[name] = reducers[name](state[name], action)
    }
    return newState
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
