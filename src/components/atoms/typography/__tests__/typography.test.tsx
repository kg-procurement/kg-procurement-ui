import { render } from "@testing-library/react";
import { withWrappers } from "@/lib/testing/utils.tsx";
import { Typography } from "../index.tsx";
import "@testing-library/jest-dom";

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
});
