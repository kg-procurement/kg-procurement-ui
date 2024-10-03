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
import { createRef } from "react";

describe("<Typography />", () => {
  it("should renders Table component", () => {
    render(<Table />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("should renders TableHeader component", () => {
    render(
      <Table>
        <TableHeader />
      </Table>,
    );
    const header = screen.getByRole("rowgroup");
    expect(header.tagName).toBe("THEAD");
    expect(header).toBeInTheDocument();
  });

  it("should renders TableBody component", () => {
    render(
      <Table>
        <TableBody />
      </Table>,
    );
    const body = screen.getByRole("rowgroup");
    expect(body.tagName).toBe("TBODY");
    expect(body).toBeInTheDocument();
  });

  it("should renders TableFooter component", () => {
    render(
      <Table>
        <TableFooter />
      </Table>,
    );
    const footer = screen.getByRole("rowgroup");
    expect(footer.tagName).toBe("TFOOT");
    expect(footer).toBeInTheDocument();
  });

  it("should renders TableRow component", () => {
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

  it("should renders TableHead component", () => {
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

  it("should renders TableCell component", () => {
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

  it("should renders TableCaption component", () => {
    render(
      <Table>
        <TableCaption>Caption</TableCaption>
      </Table>,
    );
    const caption = screen.getByText("Caption");
    expect(caption.tagName).toBe("CAPTION");
    expect(caption).toBeInTheDocument();
  });

  it("should forward ref to the underlying element for Table", () => {
    const ref = createRef<HTMLTableElement>();

    render(<Table ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it("should forward ref to the underlying element for TableHeader", () => {
    const ref = createRef<HTMLTableSectionElement>();

    render(
      <Table>
        <TableHeader ref={ref} />
      </Table>,
    );

    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
  });

  it("should forward ref to the underlying element for TableBody", () => {
    const ref = createRef<HTMLTableSectionElement>();

    render(
      <Table>
        <TableBody ref={ref} />
      </Table>,
    );

    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
  });

  it("should forward ref to the underlying element for TableFooter", () => {
    const ref = createRef<HTMLTableSectionElement>();

    render(
      <Table>
        <TableFooter ref={ref} />
      </Table>,
    );

    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
  });

  it("should forward ref to the underlying element for TableRow", () => {
    const ref = createRef<HTMLTableRowElement>();

    render(
      <Table>
        <TableBody>
          <TableRow ref={ref} />
        </TableBody>
      </Table>,
    );

    expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
  });

  it("should forward ref to the underlying element for TableCell", () => {
    const ref = createRef<HTMLTableCellElement>();

    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell ref={ref}>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
  });

  it("should forward ref to the underlying element for TableCaption", () => {
    const ref = createRef<HTMLTableCaptionElement>();

    render(
      <Table>
        <TableCaption ref={ref}>Caption</TableCaption>
      </Table>,
    );

    expect(ref.current).toBeInstanceOf(HTMLTableCaptionElement);
  });
});
