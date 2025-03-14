export const CartModal = ({ cart }) => {
  const closeCartModal = () => {
    const cartModal = document.getElementById("cart");
    if (cartModal) {
      cartModal.style.display = "none"; // Hide the modal by setting display to 'none'
    }
  };
  return (
    <div id="cart" className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <span className="close" onClick={() => closeCartModal()}>
          &times;
        </span>
        <h4>CART:</h4>
        <ul>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>: ₹{item.price}
              </li>
            ))
          ) : (
            <li>Your cart is empty.</li>
          )}
        </ul>
        <button
          style={{ marginLeft: "10px" }}
          // onClick={openCart}
          className="btn btn-primary"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
