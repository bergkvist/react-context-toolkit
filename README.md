# react-context-toolkit

Toolkit for React Context API heavily inspired by @reduxjs/toolkit and react-redux.

# Motivation

I really like the combination of react-redux and @reduxjs/toolkit. React-Redux won't work for me due to some issues:

- https://github.com/reduxjs/react-redux/issues/1298
- https://github.com/visgl/deck.gl/issues/4550

The context API in React doesn't have the same issues, so I decided to make this feel more like I'm using Redux.

# Getting Started

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

export const { useSelector, useDispatch, StateProvider } = createStore([
  componentSlice1,
  componentSlice2,
  componentSlice3,
])
```

### Creating a slice (similar to how it is done in @reduxjs/toolkit)

```ts
// src/features/component1/componentSlice1.ts

import { createSlice, PayloadAction } from 'react-context-toolkit'

const slice = createSlice({
  // two slices in the same store must never have the same name
  name: 'component1',
  initialState: {
    value: 1,
  },
  reducers: {
    // uses immer reducers to allow mutations on a draft state
    increment(state) {
      value++
    },
    incrementBy(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})
export const { increment, incrementBy } = slice.actions
export const selectValue = state => state[slice.name].value
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

### TODO: Add Component2 / Component3 to provide more examples
