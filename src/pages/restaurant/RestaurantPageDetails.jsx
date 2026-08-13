import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem as addCartItem,
  incrementItem,
  decrementItem,
  setCart,
  setUserRes,
} from "../../redux/cartSlice";

export default function RestaurantPageDetails({
  selectedRestaurant,
  displayCart
}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const handleAddItem = (dish) => {
    displayCart(true);
    dispatch(
      addCartItem({
        menuItemId: dish.id,
        price: dish.price,
      }),
    );
    dispatch(
      setUserRes({
        userId: user.id,
        restaurantId: selectedRestaurant.id,
      }),
    );
  };

  const handleIncrease = (dishId) => {
    dispatch(incrementItem(dishId));
  };

  const handleDecrease = (dishId) => {
    dispatch(decrementItem(dishId));
  };

  return (
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
                {selectedRestaurant.dishes?.map((dish) => {
                  /*
                   * Find this dish in Redux cart
                   */
                  const cartItem = cart.items.find(
                    (item) => item.menuItemId === dish.id,
                  );

                  return (
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

                        {!cartItem ? (
                          <button
                            onClick={() =>
                              handleAddItem(dish)
                            }
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
                                handleDecrease(dish.id)
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

                            <span
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              {cartItem.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleIncrease(dish.id)
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
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Col>
  );
}
