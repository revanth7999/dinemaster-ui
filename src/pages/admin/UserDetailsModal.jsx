import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import apiClient from "../../components/utils/axiosUtil";
import { AUTH_UPDATE } from "../../components/Constants";

const UserDetailsModal = ({
  user,
  show,
  onHide,
  onUpdateSuccess,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [apiResponse, setApiResponse] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] =
    useState("success");
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize component state whenever the user prop changes or modal opens
  useEffect(() => {
    if (user) {
      setFormData({ ...user });
      setIsEdit(false);
      setShowAlert(false);
    }
  }, [user, show]); // Also trigger when 'show' changes to clean up un-saved edits

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({ ...user }); // Reset to original data
    setIsEdit(false);
    setShowAlert(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setShowAlert(false); // Clear previous alerts before new attempt

    try {
      const payload = {
        email: formData.email,
        isActive: formData.isActive,
        address: formData.address,
      };

      const response = await apiClient.patch(
        `${AUTH_UPDATE}${formData.id}`,
        payload,
      );

      setAlertVariant("success");
      setApiResponse(
        response.data.message ||
          "User updated successfully",
      );
      setShowAlert(true);

      if (onUpdateSuccess) {
        onUpdateSuccess();
      }

      setTimeout(() => {
        onHide();
      }, 1200);
    } catch (error) {
      setAlertVariant("danger");
      setApiResponse(
        error.response?.data?.message ||
          "Error updating user",
      );
      setShowAlert(true);
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop={isLoading ? "static" : true}
    >
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>User Details</Modal.Title>
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
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={formData.username || ""}
                disabled // Username is omitted from payload; keeping it disabled avoids confusion
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={String(formData.isActive)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.value === "true",
                  }))
                }
                disabled={isLoading}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
          </Form>
        )}

        {showAlert && (
          <Alert
            variant={alertVariant}
            className="mt-3 mb-0"
          >
            {apiResponse}
          </Alert>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!isEdit ? (
          <>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button
              variant="dark"
              onClick={() => setIsEdit(true)}
            >
              Update
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
