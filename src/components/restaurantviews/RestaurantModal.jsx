import axios from "axios";
import { useEffect, useState } from "react";
import { CartModal } from "../cartview/CartModal";

export const RestaurantModal = ({
  selectedRestaurant,
  setSelectedRestaurant,
  setModalOpen,
}) => {
  const [cart, setCart] = useState([]);
  const [openCartModal, setIsOpenCartModal] = useState(false);
  console.log(selectedRestaurant);

  // Function to format cart for API payload
  const formatCart = () => {
    return cart.map((dish) => ({
      itemId: dish.id,
      itemName: dish.name,
      price: dish.price,
      quantity: dish.quantity || 1,
      totalPrice: (dish.price * (dish.quantity || 1)).toString(),
    }));
  };

  // Function to prepare the payload for API requests
  const preparePayload = () => {
    const customerUserName = localStorage.getItem("userName");
    const { id: restaurantId, name: restaurantName } = selectedRestaurant;

    return {
      customerUserName,
      restaurantId,
      restaurantName,
      dishes: formatCart(),
    };
  };

  // Function to close the modal and make the REST call
  // const closeModalWithRestCall = () => {
  //   const payload = preparePayload();

  //   axios
  //     .post(SAVE_CART, payload)
  //     .then((response) => {
  //       console.log("Order placed successfully:", response.data);
  //       setModalOpen(false);
  //       setSelectedRestaurant(null);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error placing the order:", error);
  //     });
  // };

  // Function to handle viewing the cart and making the REST call
  // const openCart = () => {
  //   const payload = preparePayload();

  //   axios
  //     .post(SAVE_CART, payload)
  //     .then((response) => {
  //       console.log("Cart saved successfully:", response.data);
  //       setIsOpenCartModal(true);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error saving the cart:", error);
  //     });
  // };

  // Log cart state changes for debugging
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  // If no restaurant is selected, don't render the modal
  if (!selectedRestaurant) return null;

  return (
    <>
      <div className="modal" style={{ display: "flex" }}>
        <div className="modal-content">
          <span className="close" onClick={closeModalWithRestCall}>
            &times;
          </span>
          <h2>{selectedRestaurant.name}</h2>
          <h4>Dishes:</h4>
          <ul>
            {selectedRestaurant.dishes.map((dish, index) => (
              <li key={index}>
                <strong>{dish.dishName}</strong>: {dish.description} - ₹
                {dish.price}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => setCart((prevCart) => [...prevCart, dish])}
                  className="btn btn-primary"
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
          <button
            style={{ marginLeft: "10px" }}
            onClick={openCart}
            className="btn btn-primary"
          >
            View Cart ({cart.length})
          </button>
        </div>
      </div>
      {openCartModal && <CartModal cart={cart} />}
    </>
  );
};
