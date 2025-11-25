import { useEffect, useState } from "react";
import { ALL_REST_PAG_SEA } from "../Constants";
import apiClient from "../utils/axiosUtil";
import "../admin/AllUsers.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "../utils/basicFunctions";

const AllRestaurants = () => {
  const [rest, setRest] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(50); // Default size
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchData = () => {
    apiClient
      .get(
        `${ALL_REST_PAG_SEA}?page=${page}&size=${size}&search=${debouncedSearch}`,
      )
      .then((response) => {
        const data = response.data.data;
        setRest(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching Restaurants:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms debounce
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch]);

  const goToNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const goToPage = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ width: "25%", marginBottom: "15px", marginTop: "20px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mainDivs">
        <table
          className="table table-striped"
          style={{ borderCollapse: "separate" }}
        >
          <thead style={tableHeader}>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>Restaurant Name</th>
              <th style={thStyle}>Cuisine</th>
              <th style={thStyle}>Phone No</th>
              <th style={thStyle}>Rating</th>
            </tr>
          </thead>
          {
            isEmpty(rest) ? (
              <tbody>
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                    No restaurants found.
                  </td>
                </tr>
              </tbody>
            ) : (<tbody>
            {rest.map((user, index) => (
              <tr
                key={user.id || index}
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <td style={tdStyle}>{index + 1 + page * size}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.cuisine}</td>
                <td style={tdStyle}>{user.phone}</td>
                <td style={tdStyle}>
                  {Array.from({ length: 5 }, (_, i) => {
                    const diff = user.rating - i;
                    if (diff >= 1)
                      return (
                        <FontAwesomeIcon icon={faStar} key={i} color="gold" />
                      );
                    else if (diff >= 0.5)
                      return (
                        <FontAwesomeIcon
                          icon={faStarHalfAlt}
                          key={i}
                          color="gold"
                        />
                      );
                    else
                      return (
                        <FontAwesomeIcon
                          icon={faEmptyStar}
                          key={i}
                          color="gold"
                        />
                      );
                  })}
                </td>
              </tr>
            ))}
          </tbody>)
          }
        </table>
      </div>

      {/* Dynamic Pagination */}
      <div style={{ marginTop: "20px" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {/* Previous */}
            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
              <button className="page-link" onClick={goToPrevPage}>
                Previous
              </button>
            </li>

            {/* Page Numbers */}
            {
              Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${i === page ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => goToPage(i)}>
                    {i + 1}
                  </button>
                </li>
              )).slice(0, 5) /* optional: limit to 10 buttons */
            }

            {/* Next */}
            <li
              className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={goToNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

const thStyle = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: "8px",
};

const tableHeader = {
  position: "sticky",
  top: 0,
  backgroundColor: " #f0f0f0",
  zIndex: 10,
};

export default AllRestaurants;
