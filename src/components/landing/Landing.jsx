import { useState, useEffect } from "react";
import "./Landing.css";
import "./Res.css";
import { ALL_REST, LANDING } from "../Constants";
import { RestaurantCards } from "../restaurantviews/RestaurantCards";
import { RestaurantModal } from "../restaurantviews/RestaurantModal";
import apiClient from "../utils/axiosUtil";

const Landing = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    document.title = LANDING;
    apiClient
      .get(ALL_REST)
      .then((response) => {
        setLoader(true);
        setRestaurantData(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        alert("Error while loading Restaurants!!");
        console.error("Error while loading Restaurants!!", error);
      });
  }, []);

  return (
    <div className="container-flex">
      <div className={`restaurant-list ${isModalOpen ? "slide-left" : ""}`}>
        <RestaurantCards
          loader={loader}
          restaurantData={restaurantData}
          setSelectedRestaurant={setSelectedRestaurant}
          setModalOpen={setModalOpen}
        />
      </div>

      {isModalOpen && (
        <div className="restaurant-modal">
          <RestaurantModal
            setModalOpen={setModalOpen}
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        </div>
      )}
    </div>
  );
};

export default Landing;
