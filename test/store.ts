import { createStore } from 'react-context-toolkit'
import button1Slice from './Button1/button1Slice'
import button2Slice from './Button2/button2Slice'

export const {
  useSelector,
  useDispatch,
  StateProvider,
  Store,
  initialState,
} = createStore([button1Slice, button2Slice])

export type RootState = typeof initialState
