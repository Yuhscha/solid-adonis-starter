import { render, screen, fireEvent } from '@solidjs/testing-library'
import { describe, it, expect } from 'vitest'
import Counter from './Counter'

describe('Counter', () => {
  it('renders with initial count of 0', () => {
    render(() => <Counter />)
    expect(screen.getByText('Clicks: 0')).toBeInTheDocument()
  })

  it('increments count when clicked', async () => {
    render(() => <Counter />)
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(screen.getByText('Clicks: 1')).toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.getByText('Clicks: 2')).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    render(() => <Counter />)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('w-[200px]')
    expect(button).toHaveClass('rounded-full')
    expect(button).toHaveClass('bg-gray-100')
  })
})
