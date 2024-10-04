import { render, screen } from "@testing-library/react";
import DashboardPage from "./index.tsx";
describe("<DashboardPage />", () => {
  it("should render the header section with the logo", () => {
    render(<DashboardPage />);

    const logo = screen.getByAltText("Kompas Gramedia Logo Background");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "kompas-gramedia-logo-bg.svg");

    expect(screen.getByText("Vendor A")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should render the table with correct columns and rows", () => {
    render(<DashboardPage />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(6);

    expect(screen.getByText("Lorem Ipsum Amer")).toBeInTheDocument();
    expect(screen.getByText("Rp.25000")).toBeInTheDocument();
  });

  it("should render the footer", () => {
    render(<DashboardPage />);
    expect(screen.getByText(/© 2024 KOMPAS/i)).toBeInTheDocument();
  });

  it("should render icons in the header", () => {
    render(<DashboardPage />);

    const icons = screen.getAllByRole("img");
    expect(icons).toHaveLength(2);
  });
});
