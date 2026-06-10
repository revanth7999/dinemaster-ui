const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="pagination-container">
      <nav>
        <ul className="pagination">
          {/* Previous */}
          <li
            className={`page-item ${page === 0 ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
          </li>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${page === i ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            </li>
          )).slice(0, 5)}

          {/* Next */}
          <li
            className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages - 1}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
