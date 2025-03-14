import { useState, useEffect } from "react";
import "./Landing.css";
// import restaurantData from '../restaurantData';
import "./Res.css";
import { ALL_REST, LANDING } from "../Constants";
import axios from "axios";
import { RestaurantCards } from "../restaurantviews/RestaurantCards";
import { RestaurantModal } from "../restaurantviews/RestaurantModal";

const Landing = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    document.title = LANDING;
  });

  useEffect(() => {
    axios
      .get(ALL_REST)
      .then((response) => {
        setLoader(true);
        setRestaurantData(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("There was an error logging the user!", error);
      });
  }, []);

  return (
    <>
      <RestaurantCards
        loader={loader}
        restaurantData={restaurantData}
        setSelectedRestaurant={setSelectedRestaurant}
        setModalOpen={setModalOpen}
      />
      {isModalOpen ? (
        <RestaurantModal
          setModalOpen={setModalOpen}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
        />
      ) : null}
    </>
  );
};

export default Landing;
