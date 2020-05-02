import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

import { StateProvider } from './store'
import { button1RenderCount } from './Button1/Button1'
import { button2RenderCount } from './Button2/Button2'
import { displayRenderCount } from './Display/Display'

it('Selects correct values, and prevents unneccesary rerenders', async () => {
  expect(button1RenderCount).toBe(0)
  expect(button2RenderCount).toBe(0)
  expect(displayRenderCount).toBe(0)

  // Initial render
  const app = render(
    <React.StrictMode>
      <StateProvider>
        <App />
      </StateProvider>
    </React.StrictMode>
  )
  await waitFor(() => app.getByText('Button 1: value is 0'))
  await waitFor(() => app.getByText('Button 2: value is 0'))
  await waitFor(() => app.getByText('Display: [0, 0]'))
  expect(button1RenderCount).toBe(1)
  expect(button2RenderCount).toBe(1)
  expect(displayRenderCount).toBe(1)

  // Click button 1
  fireEvent.click(app.getByTestId('button1'))
  await waitFor(() => app.getByText('Button 1: value is 1'))
  await waitFor(() => app.getByText('Button 2: value is 0'))
  await waitFor(() => app.getByText('Display: [1, 0]'))
  expect(button1RenderCount).toBe(2)
  expect(button2RenderCount).toBe(1)
  expect(displayRenderCount).toBe(2)

  // Click button 2
  fireEvent.click(app.getByTestId('button2'))
  await waitFor(() => app.getByText('Button 1: value is 1'))
  await waitFor(() => app.getByText('Button 2: value is 2'))
  await waitFor(() => app.getByText('Display: [1, 2]'))
  expect(button1RenderCount).toBe(2)
  expect(button2RenderCount).toBe(2)
  expect(displayRenderCount).toBe(3)
})
