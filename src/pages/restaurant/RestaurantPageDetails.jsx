import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  ALL_REST,
  CART_SAVE,
} from "../../components/Constants";
import apiClient from "../../components/utils/axiosUtil";

export default function RestaurantPageDetails({
  selectedRestaurant,
}) {
  const [cart, setCart] = useState({});
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const checkOutCart = async () => {
    try {
      const payload = {
        userId: user.userId,
        restaurantId: selectedRestaurant.id,
        items: cartItems.map((dish) => ({
          menuItemId: dish.id,
          quantity: cart[dish.id],
          price: dish.price,
        })),
      };

      console.log(payload);

      const response = await apiClient.post(
        `${CART_SAVE}`,
        payload,
      );

      console.log(response.data);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

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

  const cartItems =
    selectedRestaurant?.dishes?.filter((d) => cart[d.id]) ||
    [];
  const total = cartItems.reduce(
    (sum, d) => sum + d.price * cart[d.id],
    0,
  );

  return (
    // xs=12 full width on mobile, md=9 on desktop (matches your original md={9})
    <Col xs={12} md={9}>
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
          <Col xs={12} sm={8} md={8}>
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

          {/* Cart — full width on mobile, 4 cols on tablet+ */}
          <Col xs={12} sm={4} md={4}>
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "16px",
                position: "sticky",
                top: "16px",
              }}
            >
              <h5 style={{ marginBottom: "12px" }}>
                Your cart
              </h5>
              {cartItems.length === 0 ? (
                <p
                  style={{
                    color: "#999",
                    fontSize: "13px",
                  }}
                >
                  No items added yet
                </p>
              ) : (
                <>
                  {cartItems.map((dish) => (
                    <div
                      key={dish.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "13px",
                          }}
                        >
                          {dish.dishName}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "#999",
                          }}
                        >
                          x{cart[dish.id]} × ₹{dish.price}
                        </p>
                      </div>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "13px",
                        }}
                      >
                        ₹{dish.price * cart[dish.id]}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0 0",
                      fontWeight: 600,
                    }}
                  >
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <button
                    style={{
                      width: "100%",
                      marginTop: "12px",
                      padding: "10px",
                      background: "#1a73e8",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                    // onClick={() =>
                    //   console.log("Checkout", {
                    //     restaurantId: selectedRestaurant.id,
                    //     items: cartItems.map((d) => ({
                    //       menuItemId: d.id,
                    //       quantity: cart[d.id],
                    //     })),
                    //   })
                    // }
                    onClick={checkOutCart}
                  >
                    Proceed to checkout
                  </button>
                </>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Col>
  );
}
