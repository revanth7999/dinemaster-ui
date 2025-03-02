import { useState, useEffect } from 'react';
import './Landing.css'; // Import the external CSS file
import restaurantData from '../restaurantData';
import './Res.css';
import im from '../utils/food-logo.png';

const Landing = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal and set the selected restaurant
  const handleCardClick = (restaurant) => {
    console.log(restaurant);
    setSelectedRestaurant(restaurant);
    setModalOpen(true);
  };

  const RestaurantCards = () => {
    return (
      <div className='scrollable'>
        {restaurantData.restaurants.map((restaurant) => (
          <div 
            className="card mb-3" 
            style={{ maxWidth: '540px', cursor: 'pointer', alignItems:'center', left: '50px' }} 
            key={restaurant.id}
            onClick={() => handleCardClick(restaurant)} // Set the restaurant and open modal on click
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img src={im} className="img-fluid rounded-start" alt={restaurant.name} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state}, {restaurant.address.zipCode}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Cuisine: {restaurant.cuisine}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Phone: {restaurant.phone}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Rating: {restaurant.rating} / 5</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const RestaurantModal = () => {
    const [cart, setCart] = useState([]);
    const handleAddToCart = (dish) => {
      setCart((prevCart) => [...prevCart, dish]);
    };

    const closeModal = () => {
      alert(cart.map(element => element.name).join('\n'));
      setModalOpen(false);
      setSelectedRestaurant(null);
    };
    
    useEffect(() => {
      console.log(cart);
    }, [cart]);

    if (!selectedRestaurant) return null;

    return (
      <div className="modal" style={{display:'flex'}}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>{selectedRestaurant.name}</h2>
          <h4>Dishes:</h4>
          <ul>
            {selectedRestaurant.dishes.map((dish, index) => (
              <li key={index}>
                <strong>{dish.name}</strong>: {dish.description} - ₹{dish.price}
                <button 
                  style={{ marginLeft: '10px' }} 
                  onClick={() => handleAddToCart(dish)}
                  className="btn btn-primary"
                >
                Add to Cart
                </button>
              </li>
            ))}
          </ul>
          <span>CART {cart.length}</span>
        </div>
      </div>

    );
  };

  return (
    <>
      <RestaurantCards />
      {isModalOpen ? <RestaurantModal /> : null}
    </>
  );
};

export default Landing;
