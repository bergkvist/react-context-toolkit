import React from 'react'
import { useSelector, useDispatch } from '../store'
import { incrementBy, selectValue } from './button2Slice'

export let button2RenderCount = 0

export default function Button2() {
  React.useEffect(() => {
    button2RenderCount++
  })
  const value = useSelector(selectValue)
  const dispatch = useDispatch()

  return (
    <button onClick={() => dispatch(incrementBy(2))} data-testid='button2'>
      Button 2: value is {value}
    </button>
  )
}
