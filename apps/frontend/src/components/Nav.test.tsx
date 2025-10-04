import { render, screen } from '@solidjs/testing-library'
import { Router, Route } from '@solidjs/router'
import { describe, it, expect } from 'vitest'
import Nav from './Nav'

// Helper function to render Nav with router context
const renderWithRouter = (initialPath = '/') => {
  return render(() => (
    <Router url={initialPath}>
      <Route path="*" component={() => <Nav />} />
    </Router>
  ))
}

describe('Nav', () => {
  it('renders navigation links', () => {
    renderWithRouter()

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('applies active class to current route', () => {
    renderWithRouter('/')

    const homeLink = screen.getByText('Home').closest('li')
    expect(homeLink).toHaveClass('border-sky-600')
  })

  it('applies active class to about route', () => {
    renderWithRouter('/about')

    const aboutLink = screen.getByText('About').closest('li')
    // The active class should include border-sky-600 in the class list
    expect(aboutLink?.className).toContain('border-sky-600')
  })

  it('applies inactive class to non-current routes', () => {
    renderWithRouter('/')

    const aboutLink = screen.getByText('About').closest('li')
    expect(aboutLink).toHaveClass('border-transparent')
  })

  it('has correct navigation structure', () => {
    renderWithRouter()

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('bg-sky-800')

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[1]).toHaveAttribute('href', '/about')
    expect(links[2]).toHaveAttribute('href', '/shared-test')
  })
})
