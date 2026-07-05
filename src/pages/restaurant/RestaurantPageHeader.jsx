import { Button, Stack } from "react-bootstrap";
import { FaBell, FaPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function RestaurantPageHeader({
  updateDisplayCart,
  userCartDetails,
}) {
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

        <div className="ms-auto d-flex align-items-center gap-3">
          <div
            style={{
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() =>
              updateDisplayCart((prev) => !prev)
            }
          >
            <FaCartShopping
              size={20}
              color="black"
              style={{ marginRight: "8px" }}
            />

            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                minWidth: "16px",
                height: "16px",
                borderRadius: "999px",
                background:
                  userCartDetails.length > 0
                    ? "#ef4444"
                    : "#6b7280",
                color: "#fff",
                fontSize: "10px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px",
              }}
            >
              {userCartDetails.length}
            </span>
          </div>

          <Button variant="dark">
            <FaPlus style={{ marginRight: "8px" }} />
            Add Restaurant
          </Button>
        </div>
      </Stack>
    </div>
  );
}
