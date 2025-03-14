import im from "../utils/food-logo.png";

export const RestaurantCards = ({
  loader,
  restaurantData,
  setSelectedRestaurant,
  setModalOpen,
}) => {
  // console.log(restaurantData)
  // Function to open the modal and set the selected restaurant
  const handleCardClick = (restaurant) => {
    console.log(restaurant);
    setSelectedRestaurant(restaurant);
    setModalOpen(true);
  };

  return (
    <div className="scrollable">
      {loader == true ? (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          {restaurantData.map((restaurant) => (
            <div
              className="card mb-3"
              style={{
                maxWidth: "540px",
                cursor: "pointer",
                alignItems: "center",
                left: "50px",
              }}
              key={restaurant.id}
              onClick={() => handleCardClick(restaurant)} // Set the restaurant and open modal on click
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={im}
                    className="img-fluid rounded-start"
                    alt={restaurant.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">
                      {restaurant.address.street}, {restaurant.address.city},{" "}
                      {restaurant.address.state}, {restaurant.address.zipCode}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Cuisine: {restaurant.cuisine}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Phone: {restaurant.phone}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Rating: {restaurant.rating} / 5
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
