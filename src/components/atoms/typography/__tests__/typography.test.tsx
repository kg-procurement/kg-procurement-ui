import { render } from "@testing-library/react";
import { withWrappers } from "@/lib/testing/utils.tsx";
import { Typography } from "../index.tsx";
import "@testing-library/jest-dom";
import { createRef } from "react";

describe("<Typography />", () => {
  it("should render correctly with correct children", () => {
    const { container } = render(
      withWrappers(<Typography>Sample Text</Typography>),
    );
    expect(container.textContent).toMatchInlineSnapshot(`"Sample Text"`);
  });

  it('should render as an h1 tag when variant is "h1"', () => {
    const { container } = render(
      <Typography variant="h1">Heading 1</Typography>,
    );
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("should forward ref to the underlying element", () => {
    const ref = createRef<HTMLParagraphElement>();

    render(<Typography ref={ref}>Sample Text</Typography>);

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current?.textContent).toBe("Sample Text");
  });

  it("should apply the custom className to the element", () => {
    const { container } = render(
      <Typography className="custom-class">Sample Text</Typography>,
    );

    const element = container.querySelector("p");
    expect(element).toHaveClass("custom-class");
  });

  it("should apply additional props to the component", () => {
    const { container } = render(
      <Typography id="test-id" data-testid="typography-element">
        Sample Text
      </Typography>,
    );

    const element = container.querySelector("p");

    expect(element).toHaveAttribute("id", "test-id");
    expect(element).toHaveAttribute("data-testid", "typography-element");
  });

  it("should render as a custom element when using asChild", () => {
    const { container } = render(
      <Typography asChild>
        <span data-testid="custom-element">Custom Tag</span>
      </Typography>,
    );

    const customElement = container.querySelector(
      '[data-testid="custom-element"]',
    );

    expect(customElement).toBeInTheDocument();
    expect(customElement?.tagName).toBe("SPAN");
    expect(container.textContent).toBe("Custom Tag");
  });
});
