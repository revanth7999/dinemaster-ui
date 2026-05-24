import React from "react";
import { Col } from "react-bootstrap";

export default function RestaurantPageDetails({
  selectedRestaurant,
}) {
  return (
    <Col md={9}>
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {!selectedRestaurant ? (
          <h4>Select Restaurant</h4>
        ) : (
          <>
            <h2>{selectedRestaurant.name}</h2>

            <p>{selectedRestaurant.cuisine}</p>
          </>
        )}
      </div>
    </Col>
  );
}
