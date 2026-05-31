import { Button, Stack } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function RestaurantPageHeader() {
  return (
    <div style={{ padding: "16px 20px" }}>
      <Stack
        direction="horizontal"
        gap={3}
        className="flex-wrap"
      >
        <div>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Restaurants
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#6c757d",
              margin: 0,
            }}
          >
            Manage and view all your restaurants
          </p>
        </div>
        <div className="ms-auto">
          <Button variant="dark">
            <FaPlus style={{ marginRight: "8px" }} />
            Add Restaurant
          </Button>
        </div>
      </Stack>
    </div>
  );
}
