import { render } from "@testing-library/react";
import { Footer } from "./index.tsx";

describe("<Footer />", () => {
  it("should render the KOMPAS logo with the correct alt text", () => {
    const { getByAltText } = render(<Footer />);
    const logo = getByAltText("Kompas Gramedia");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "kompas-gramedia.jpeg");
  });

  it("should display the copyright text", () => {
    const { getByText } = render(<Footer />);
    const copyrightText = getByText("© 2024 KOMPAS");
    expect(copyrightText).toBeInTheDocument();
  });

  it("should render the main description text", () => {
    const { container } = render(<Footer />);
    const descriptionText = container.querySelector("#footer-description");
    expect(descriptionText).toBeInTheDocument();
  });

  it("should display the contact us section", () => {
    const { getByText } = render(<Footer />);
    const contactText = getByText("Contact us (Email):");
    expect(contactText).toBeInTheDocument();
  });
});
