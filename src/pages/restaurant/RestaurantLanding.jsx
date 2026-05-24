import { useEffect, useState } from "react";
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

const RestaurantLanding = () => {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState(null);

  useDocumentTitle("Restaurants View");

  return (
    <div
      style={{
        background: "#f4f6f9",
        height: "calc(100vh - 60px)",
      }}
    >
      <RestaurantPageHeader />
      <Container fluid>
        <Row>
          <RestaurantPageList
            onSelectRestaurant={setSelectedRestaurant}
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
