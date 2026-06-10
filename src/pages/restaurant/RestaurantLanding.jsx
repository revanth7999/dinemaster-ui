import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { ALL_REST } from "../../components/Constants";
import apiClient from "../../components/utils/axiosUtil";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import RestaurantPageHeader from "./RestaurantPageHeader";
import RestaurantPageList from "./RestaurantPageList";
import RestaurantPageDetails from "./RestaurantPageDetails";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useNavigate, useParams } from "react-router-dom";

const RestaurantLanding = () => {
  const { id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] =
    useState(null);
  const navigate = useNavigate();
  useDocumentTitle("Restaurants View");

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("refreshed", "true");
    };
    window.addEventListener(
      "beforeunload",
      handleBeforeUnload,
    );
    return () =>
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload,
      );
  }, []);

  useEffect(() => {
    const wasRefreshed =
      sessionStorage.getItem("refreshed");

    if (wasRefreshed) {
      sessionStorage.removeItem("refreshed");
      if (id) {
        navigate("/restaurants", {
          replace: true,
        });
      }
      return;
    }

    if (id) {
      fetchRestaurantById(id);
    } else {
      setSelectedRestaurant(null);
    }
  }, [id]);

  const fetchRestaurantById = useCallback(
    async (restaurantId) => {
      try {
        const response = await apiClient.get(
          `${ALL_REST}/${restaurantId}`,
        );
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    },
    [],
  );

  return (
    <div
      style={{
        background: "#f4f6f9",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <RestaurantPageHeader />
      <Container fluid className="px-2 px-md-3 py-3">
        <Row className="g-3">
          <RestaurantPageList
            onSelectRestaurant={setSelectedRestaurant}
            selectedRestaurant={selectedRestaurant}
          />
          <RestaurantPageDetails
            selectedRestaurant={selectedRestaurant}
          />
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantLanding;
