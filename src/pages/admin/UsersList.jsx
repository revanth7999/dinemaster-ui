import React, { useEffect, useState } from "react";
import {
  AUTH_SHOW_USERS,
  AUTH_UPDATE,
} from "../../components/Constants";
import apiClient from "../../components/utils/axiosUtil";
import "./UsersList.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/Pagination";
import UserDetailsModal from "./UserDetailsModal";

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
  const [debouncedSearch, setDebouncedSearch] =
    useState("");
  const [search, setSearch] = useState("");
  const PAGE_SIZE = 20;

  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get(
        `${AUTH_SHOW_USERS}?page=${page}&size=${PAGE_SIZE}&search=${debouncedSearch}`,
      );
      const data = response.data.data;
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="users-wrapper">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search users..."
      />

      <div className="users-table-container">
        <DataTable
          columns={["S.No", "Username", "Role", "Status"]}
          data={users}
          emptyMessage="No users found"
          renderRow={(user, index) => (
            <tr key={user.id}>
              <td>{index + 1 + page * PAGE_SIZE}</td>
              <td
                onClick={() => {
                  setSelectedUser(user);
                  setModalShow(true);
                }}
              >
                {user.username}
              </td>
              <td>{user.role}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "999px",
                    backgroundColor: user.isActive
                      ? "#dcfce7"
                      : "#fee2e2",
                    color: user.isActive
                      ? "#16a34a"
                      : "#dc2626",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: user.isActive
                        ? "#22c55e"
                        : "#ef4444",
                    }}
                  ></span>

                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          )}
        />
      </div>

      <UserDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={selectedUser}
        onUpdateSuccess={fetchUsers}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
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
