import { createSlice, PayloadAction } from 'react-context-toolkit'
import { RootState } from '../store'

const slice = createSlice({
  name: 'button2', // This will be the accessor in the global state
  initialState: {
    value: 0,
  },
  reducers: {
    incrementBy(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { incrementBy } = slice.actions
export const selectValue = (state: RootState) => state[slice.name].value
export default slice
