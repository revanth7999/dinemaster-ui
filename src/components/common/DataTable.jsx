import "./DataTable.css";

const SkeletonRow = ({ columns }) => (
  <tr>
    {columns.map((_, index) => (
      <td key={index}>
        <div className="skeleton-cell" />
      </td>
    ))}
  </tr>
);

const DataTable = ({
  columns,
  data,
  renderRow,
  emptyMessage = "No data found",
  loading = false,
  skeletonRows = 5,
}) => {
  return (
    <table className="table table-striped">
      <thead className="table-header">
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          Array.from({ length: skeletonRows }).map(
            (_, index) => (
              <SkeletonRow key={index} columns={columns} />
            ),
          )
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="empty-message"
            >
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((item, index) => renderRow(item, index))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
