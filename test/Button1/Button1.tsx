import React from 'react'
import { useSelector, useDispatch } from '../store'
import { increment } from './button1Slice'

export let button1RenderCount = 0

export default function Button1() {
  React.useEffect(() => {
    button1RenderCount++
  })
  const value = useSelector(state => state.button1.value)
  const dispatch = useDispatch()

  return (
    <button onClick={() => dispatch(increment())} data-testid='button1'>
      Button 1: value is {value}
    </button>
  )
}
