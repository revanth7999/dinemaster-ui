const Pagination = ({ page, totalPages, setPage }) => {
  const MAX_VISIBLE = 5;

  // Calculate dynamic start and end page indices (0-based)
  const getVisiblePages = () => {
    let start = Math.max(0, page - Math.floor(MAX_VISIBLE / 2));
    let end = start + MAX_VISIBLE;

    // Adjust if reaching the end of pages
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(0, end - MAX_VISIBLE);
    }

    const pages = [];
    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-container">
      <nav>
        <ul className="pagination">
          {/* Previous Button */}
          <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
          </li>

          {/* Dynamic Page Numbers */}
          {visiblePages.map((pageNum) => (
            <li
              key={pageNum}
              className={`page-item ${page === pageNum ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(pageNum)}
              >
                {pageNum + 1}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li
            className={`page-item ${
              page >= totalPages - 1 ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= totalPages - 1}
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