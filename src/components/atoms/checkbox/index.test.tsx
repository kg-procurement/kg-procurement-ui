// Checkbox.test.tsx
import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { Checkbox } from './index.tsx'

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
})
