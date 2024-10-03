const Table = ({ ...props }) => (
  <div className="relative w-full overflow-auto">
    <table {...props} />
  </div>
);

const TableHeader = ({ ...props }) => <thead {...props} />;

const TableBody = ({ ...props }) => <tbody {...props} />;

const TableFooter = ({ ...props }) => <tfoot {...props} />;

const TableRow = ({ ...props }) => <tr {...props} />;

const TableHead = ({ ...props }) => <th {...props} />;

const TableCell = ({ ...props }) => <td {...props} />;

const TableCaption = ({ ...props }) => <caption {...props} />;

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableFooter.displayName = "TableFooter";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
