import { render } from "@testing-library/react";
import { withWrappers } from "@/lib/testing/utils.tsx";
import { Typography } from "../index.tsx";

describe("<Typography />", () => {
  it("should render correctly with correct children", () => {
    const { container } = render(
      withWrappers(<Typography>Sample Text</Typography>),
    );
    expect(container.textContent).toMatchInlineSnapshot(`"Sample Text"`);
  });
});
