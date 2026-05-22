const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="pagination-container">
      <nav>
        <ul className="pagination">
          <li
            className={`page-item ${
              page === 0 ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${
                page === i ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            </li>
          )).slice(0, 5)}

          <li
            className={`page-item ${
              page === totalPages - 1 ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setPage((prev) => prev + 1)}
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
