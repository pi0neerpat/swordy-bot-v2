import { render } from '@redwoodjs/testing/web'

import RedirectOptions from './RedirectOptions'

describe('RedirectOptions', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RedirectOptions />)
    }).not.toThrow()
  })
})
