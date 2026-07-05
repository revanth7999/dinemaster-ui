import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  ALL_REST,
  CART_SAVE,
} from "../../components/Constants";
import apiClient from "../../components/utils/axiosUtil";

export default function RestaurantPageDetails({
  selectedRestaurant,
  userCartDetails,
}) {
  const [cart, setCart] = useState({});
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const addItem = (dish) => {
    setCart((prev) => ({
      ...prev,
      [dish.id]: (prev[dish.id] || 0) + 1,
    }));
  };

  const changeQty = (dishId, delta) => {
    setCart((prev) => {
      const updated = {
        ...prev,
        [dishId]: (prev[dishId] || 0) + delta,
      };
      if (updated[dishId] <= 0) delete updated[dishId];
      return updated;
    });
  };

  return (
    // xs=12 full width on mobile, md=9 on desktop (matches your original md={9})
    <Col xs={12} md={5}>
      {!selectedRestaurant ? (
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h4>Select a restaurant</h4>
        </div>
      ) : (
        <Row className="g-3">
          {/* Dishes — full width on mobile, 8 cols on tablet+ */}
          <Col xs={12} sm={10} md={10}>
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <h2 style={{ fontSize: "20px" }}>
                {selectedRestaurant.name}
              </h2>
              <p
                style={{
                  color: "#6c757d",
                  fontSize: "14px",
                }}
              >
                {selectedRestaurant.cuisine}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: "12px",
                  marginTop: "12px",
                }}
              >
                {selectedRestaurant.dishes?.map((dish) => (
                  <div
                    key={dish.id}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "10px",
                      padding: "14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 600,
                        margin: 0,
                        fontSize: "14px",
                      }}
                    >
                      {dish.dishName}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        flex: 1,
                        margin: 0,
                      }}
                    >
                      {dish.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>
                        ₹{dish.price}
                      </span>
                      {!cart[dish.id] ? (
                        <button
                          onClick={() => addItem(dish)}
                          style={{
                            padding: "4px 12px",
                            borderRadius: "6px",
                            border: "1px solid #1a73e8",
                            color: "#1a73e8",
                            background: "white",
                            cursor: "pointer",
                            fontSize: "13px",
                          }}
                        >
                          + Add
                        </button>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            onClick={() =>
                              changeQty(dish.id, -1)
                            }
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "6px",
                              border: "1px solid #ddd",
                              cursor: "pointer",
                              background: "white",
                            }}
                          >
                            −
                          </button>
                          <span style={{ fontWeight: 600 }}>
                            {cart[dish.id]}
                          </span>
                          <button
                            onClick={() =>
                              changeQty(dish.id, 1)
                            }
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "6px",
                              border: "1px solid #ddd",
                              cursor: "pointer",
                              background: "white",
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Col>
  );
}
