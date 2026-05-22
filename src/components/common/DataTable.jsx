import "./DataTable.css";

const DataTable = ({
  columns,
  data,
  renderRow,
  emptyMessage = "No data found",
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
        {data.length === 0 ? (
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
