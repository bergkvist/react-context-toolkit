# react-context-toolkit

Toolkit for React Context API - heavily inspired by @reduxjs/toolkit and react-redux, and written in TypeScript.

# Features

- Uses React Context API instead of Redux for managing state.
- Provides `useSelector` and `useDispatch` hooks. (Just like [react-redux](https://www.npmjs.com/package/react-redux), but with "autocomplete" inside useSelector)
- Allows creating a modular, and yet global store. (Uses [`@reduxjs/toolkit`-slices](https://github.com/reduxjs/redux-toolkit/blob/master/docs/api/createSlice.md) to build store)
- Depends on [`use-context-selector`](https://github.com/dai-shi/use-context-selector) to prevent unneccesary rerenders. (https://github.com/reactjs/rfcs/pull/119)

# Motivation

I really like the combination of react-redux and @reduxjs/toolkit. React-Redux won't work for me due to this issue:

- https://github.com/visgl/deck.gl/issues/4550

The context API in React doesn't suffer from the same problem, so I decided to make this feel more like I'm using Redux.

# Getting Started

## Installation

```sh
# Using npm
npm install --save react-context-toolkit

# using yarn
yarn add react-context-toolkit
```

## Application Example

Also, check out the test folder for another example.

### Wrapping the application in a provider

```tsx
// ./src/index.tsx

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { StateProvider } from './app/store'

// Wrap your app in the state provider like this:
ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
  document.getElementById('root')
)

```

### The App component

Notice that it doesn't need to know anything about the store

```tsx
// src/App.tsx

import Component1 from '../features/component1/Component1'
import Component2 from '../features/component2/Component2'
import Component3 from '../features/component3/Component3'

// Note that the App component doesn't need to know anything about the store!
export default function App() {
  return (
    <>
      <Component1 />
      <Component2 />
      <Component3 />
    </>
  )
}
```

### Creating the store

```ts
// src/app/store.ts

import { createStore } from 'react-context-toolkit'
import componentSlice1 from '../features/component1/componentSlice1'
import componentSlice2 from '../features/component2/componentSlice2'
import componentSlice3 from '../features/component3/componentSlice3'

export const {
  useSelector,
  useDispatch,
  StateProvider,
  initialState,
} = createStore([componentSlice1, componentSlice2, componentSlice3])

// In case you need direct access to the type of the combined state
export type RootState = typeof initialState
```

### Creating a slice (similar to how it is done in @reduxjs/toolkit)

```ts
// src/features/component1/componentSlice1.ts

import { createSlice, PayloadAction } from 'react-context-toolkit'
// ^ You can also import these from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const slice = createSlice({
  // This name becomes the key in the global state
  name: 'component1',
  initialState: {
    value: 1,
  },
  reducers: {
    // uses immer reducers to allow mutations on an intermediate draft state
    increment(state) {
      value++
    },
    incrementBy(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})
export const { increment, incrementBy } = slice.actions
export const selectValue = (state: RootState) => state[slice.name].value
```

### How state can be used and updated from a component

```tsx
// src/features/component1/Component1.tsx

import { useSelector, useDispatch } from '../../app/store'
import { increment, incrementBy, selectValue } from './componentSlice1'

export default function Component1() {
  const value = useSelector(selectValue)
  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(increment())}>
      I have been clicked {value} times!
    </button>
  )
}
```

## For more examples, see the test folder on GitHub
