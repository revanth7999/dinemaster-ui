import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function RestaurantPageHeader() {
  return (
    <div style={{ padding: "10px" }}>
      <Stack direction="horizontal" gap={3}>
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Restaurants{" "}
          <p
            style={{
              fontSize: "14px",
              color: "#6c757d",
              margin: 0,
            }}
          >
            Manage and view all your restaurants
          </p>
        </h1>
        <div className="p-2 ms-auto"> </div>
        <div className="p-2">
          <Button variant="dark">
            <FaPlus style={{ marginRight: "8px" }} />
            Add Restaurant
          </Button>
        </div>
      </Stack>
    </div>
  );
}
