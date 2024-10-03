import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./index.tsx";

describe("<Typography />", () => {
  test("renders Table component", () => {
    render(<Table />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("renders TableHeader component", () => {
    render(
      <Table>
        <TableHeader />
      </Table>,
    );
    const header = screen.getByRole("rowgroup");
    expect(header.tagName).toBe("THEAD");
    expect(header).toBeInTheDocument();
  });

  test("renders TableBody component", () => {
    render(
      <Table>
        <TableBody />
      </Table>,
    );
    const body = screen.getByRole("rowgroup");
    expect(body.tagName).toBe("TBODY");
    expect(body).toBeInTheDocument();
  });

  test("renders TableFooter component", () => {
    render(
      <Table>
        <TableFooter />
      </Table>,
    );
    const footer = screen.getByRole("rowgroup");
    expect(footer.tagName).toBe("TFOOT");
    expect(footer).toBeInTheDocument();
  });

  test("renders TableRow component", () => {
    render(
      <Table>
        <TableBody>
          <TableRow />
        </TableBody>
      </Table>,
    );
    const row = screen.getByRole("row");
    expect(row.tagName).toBe("TR");
    expect(row).toBeInTheDocument();
  });

  test("renders TableHead component", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    const head = screen.getByRole("columnheader");
    expect(head.tagName).toBe("TH");
    expect(head).toHaveTextContent("Header");
  });

  test("renders TableCell component", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const cell = screen.getByRole("cell");
    expect(cell.tagName).toBe("TD");
    expect(cell).toHaveTextContent("Cell");
  });

  test("renders TableCaption component", () => {
    render(
      <Table>
        <TableCaption>Caption</TableCaption>
      </Table>,
    );
    const caption = screen.getByText("Caption");
    expect(caption.tagName).toBe("CAPTION");
    expect(caption).toBeInTheDocument();
  });
});
