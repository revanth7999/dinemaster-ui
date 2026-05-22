import React, { useEffect, useState } from "react";
import { AUTH_SHOW_USERS, AUTH_UPDATE } from "../Constants";
import apiClient from "../utils/axiosUtil";
import "../admin/UsersList.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [apiResponse, setApiResponse] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showAlert, setShowAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(50); // Default size
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    apiClient
      .get(AUTH_SHOW_USERS)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  function MydModalWithGrid({ user, ...props }) {
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
      if (user) {
        setFormData(user);
        setIsEdit(false); // reset when opening
      }
    }, [user]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const payload = {
      email: formData.email,
      isActive: formData.isActive,
      address: formData.address,
    };

    const handleSave = () => {
      // console.log("Updated user:", formData);
      console.log(
        "Payload:",
        JSON.stringify(payload, null, 2),
      );
      apiClient
        .patch(`${AUTH_UPDATE}${formData.id}`, payload)
        .then((response) => {
          setApiResponse(response.data.message);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
      props.onHide();
    };

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
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            User Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isEdit ? (
            <>
              <p>
                <strong>Username:</strong> {user?.username}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {user?.isActive ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Address:</strong> {user?.address}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {user?.created_time_stamp}
              </p>
            </>
          ) : (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={formData.username || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="isActive"
                  value={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  value={formData.adress || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Created</Form.Label>
                <Form.Control
                  value={formData.created_time_stamp || ""}
                  readOnly
                />
              </Form.Group>
            </Form>
          )}
          {showAlert ? (
            <Alert key="success" variant="success">
              {apiResponse}
            </Alert>
          ) : (
            <div></div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={props.onHide}
          >
            Close
          </Button>

          {!isEdit ? (
            <Button
              variant="dark"
              onClick={() => setIsEdit(true)}
            >
              Update
            </Button>
          ) : (
            <Button variant="dark" onClick={handleSave}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="users-wrapper">
      <div
        style={{
          width: "25%",
          marginBottom: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="users-table-container">
        <table
          className="table table-striped"
          style={{ borderCollapse: "separate" }}
        >
          <thead style={tableHeader}>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id || index}
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <td style={tdStyle}>{index + 1}</td>
                <td
                  style={tdStyle}
                  onClick={() => {
                    setSelectedUser(user);
                    setModalShow(true);
                  }}
                >
                  {user.username}
                </td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      backgroundColor: user.isActive
                        ? "#4CAF50"
                        : "#F44336", // Green or Red
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {user.isActive == true
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MydModalWithGrid
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={selectedUser}
      />

      {/* Dynamic Pagination */}
      <div style={{ marginTop: "20px" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {/* Previous */}
            <li
              className={`page-item ${page === 0 ? "disabled" : ""}`}
            >
              <button className="page-link">
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
                  <button className="page-link">{1}</button>
                </li>
              )).slice(
                0,
                5,
              ) /* optional: limit to 10 buttons */
            }

            {/* Next */}
            <li
              className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}
            >
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </div>
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

const tableHeader = {
  position: "sticky",
  top: 0,
  backgroundColor: " #f0f0f0",
  zIndex: 10,
};

export default UsersList;
