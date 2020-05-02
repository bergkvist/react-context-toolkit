import { createSlice } from 'react-context-toolkit'

const slice = createSlice({
  name: 'button1', // This will be the accessor in the global state
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value++
    },
  },
})

export const { increment } = slice.actions
export default slice
