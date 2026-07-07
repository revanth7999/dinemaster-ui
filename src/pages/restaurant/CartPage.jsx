import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

export default function CartPage({
  selectedRestaurant,
  userCartDetails,
}) {
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (
      selectedRestaurant?.dishes &&
      userCartDetails?.length > 0 &&
      Object.keys(cart).length === 0
    ) {
      const existingCart = {};

      userCartDetails.forEach((item) => {
        existingCart[item.menuItemId] = item.quantity;
      });

      setCart(existingCart);
    }
  }, [userCartDetails, selectedRestaurant]);

  const total = userCartDetails.reduce(
    (sum, item) =>
      sum + item.menuItem.price * item.quantity,
    0,
  );

  //   const checkOutCart = async () => {
  //     try {
  //       const payload = {
  //         userId: user.userId,
  //         restaurantId: selectedRestaurant.id,
  //         items: cartItems.map((dish) => ({
  //           menuItemId: dish.id,
  //           quantity: cart[dish.id],
  //           price: dish.price,
  //         })),
  //       };

  //       console.log(payload);

  //       const response = await apiClient.post(
  //         `${CART_SAVE}`,
  //         payload,
  //       );

  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Checkout failed:", error);
  //     }
  //   };
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
        {userCartDetails.length === 0 ? (
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
            {userCartDetails.map((item) => (
              <div
                key={item.menuItem.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div
                  style={{ display: "flex", gap: "12px" }}
                >
                  <img
                    src={item.menuItem.dishImageUrl}
                    alt={item.menuItem.dishName}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <h6 style={{ margin: 0 }}>
                      {item.menuItem.dishName}
                    </h6>
                    <small style={{ color: "#666" }}>
                      {item.restaurant.name}
                    </small>
                    <br />
                    <small>
                      ₹{item.menuItem.price} ×{" "}
                      {item.quantity}
                    </small>
                  </div>
                </div>

                <strong>
                  ₹{item.menuItem.price * item.quantity}
                </strong>
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

            <button
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "12px",
                background: "#1a73e8",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </Col>
  );
}
