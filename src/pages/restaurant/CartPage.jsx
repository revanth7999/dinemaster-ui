import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import apiClient from "../../components/utils/axiosUtil";
import { ADD_TO_CART } from "../../components/Constants";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const items = cart?.items || [];
  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;

    setCheckoutError(null);
    setIsCheckingOut(true);

    const payload = {
      userId: cart.userId,
      restaurantId: cart.restaurantId,
      items: items.map(({ menuItemId, quantity, price }) => ({
        menuItemId,
        quantity,
        price,
      })),
    };

    try {
      await apiClient.post(ADD_TO_CART, payload);
      dispatch(clearCart());
      // navigate to order confirmation / next step here if applicable
    } catch (err) {
      setCheckoutError(
        err.response?.data?.message ||
          "Couldn't complete checkout. Please try again.",
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
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
        <h5 style={{ marginBottom: "12px" }}>Your cart</h5>

        {items.length === 0 ? (
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
            {items.map((item) => (
              <div
                key={item.menuItemId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <img
                    src={item.dishImageUrl}
                    alt={item.dishName}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <h6 style={{ margin: 0 }}>{item.dishName}</h6>

                    <small style={{ color: "#666" }}>
                      {item.restaurantName}
                    </small>

                    <br />

                    <small>
                      ₹{item.price} × {item.quantity}
                    </small>
                  </div>
                </div>

                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <span>Total</span>

              <span>₹{total}</span>
            </div>

            {checkoutError && (
              <p
                style={{
                  color: "#d32f2f",
                  fontSize: "13px",
                  marginTop: "10px",
                }}
              >
                {checkoutError}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "12px",
                background: isCheckingOut ? "#90b8ec" : "#1a73e8",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: isCheckingOut ? "not-allowed" : "pointer",
              }}
            >
              {isCheckingOut ? "Placing order..." : "Proceed to Checkout"}
            </button>
          </>
        )}
      </div>
    </Col>
  );
}