import React, { useEffect, useState } from "react";
import { ALL_REST, AUTH_SHOW_USERS } from "../Constants";
import apiClient from "../utils/axiosUtil";
import "../admin/AllUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";

const AllRestaurants = () => {
  const [rest, setRest] = useState([]);

  useEffect(() => {
    apiClient
      .get(ALL_REST)
      .then((response) => {
        setRest(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Restaurants:", error);
      });
  }, []);

  return (
    <div className="mainDivs">
      <table
        className="table table-striped"
        style={{ borderCollapse: "separate" }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th style={thStyle}>S.No</th>
            <th style={thStyle}>Restaurant Name</th>
            <th style={thStyle}>Phone No</th>
            <th style={thStyle}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {rest.map((user, index) => (
            <tr
              key={user.id || index}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{user.name}</td>
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
        </tbody>
      </table>
    </div>
  );
};

// Basic styling
const thStyle = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: "8px",
};

export default AllRestaurants;
