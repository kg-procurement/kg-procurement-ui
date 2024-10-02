// Checkbox.test.tsx
import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { Checkbox } from './index.tsx'
import { createRef } from 'react'

describe('<Checkbox />', () => {
  it('should render the checkbox', () => {
    render(<Checkbox />)
    const checkboxElement = screen.getByRole('checkbox')
    expect(checkboxElement).toBeInTheDocument()
  })

  it("should render the indicator when checked", () => {
    render(<Checkbox />);

    expect(
      screen.queryByRole("checkbox", { checked: true }),
    ).not.toBeInTheDocument();

    const checkboxElement = screen.getByRole("checkbox");
    fireEvent.click(checkboxElement);

    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox").querySelector("svg.h-4.w-4"),
    ).toBeInTheDocument();
  });

it("should forward ref to the underlying element", () => {
  const ref = createRef<HTMLButtonElement>();

  render(<Checkbox ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});
})
