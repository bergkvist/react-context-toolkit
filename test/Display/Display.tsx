import React from 'react'
import { useSelector } from '../store'

export let displayRenderCount = 0

export default function Display() {
  React.useEffect(() => {
    displayRenderCount++
  })
  const [value1, value2] = useSelector(state => [
    state.button1.value,
    state.button2.value,
  ])
  return (
    <div>
      Display: [{value1}, {value2}]
    </div>
  )
}
