import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import { ALL_REST } from "../../components/Constants";
import apiClient from "../../components/utils/axiosUtil";
import "./RestaurantPageList.css";
import { useNavigate } from "react-router-dom";

export default function RestaurantPageList({
  onSelectRestaurant,
}) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const PAGE_SIZE = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, [page, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchRestaurants = async () => {
    try {
      const response = await apiClient.get(
        `${ALL_REST}?page=${page}&size=${PAGE_SIZE}&search=${debouncedSearch}`,
      );
      const data = response.data.data;
      setRestaurants(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
  //   useEffect(() => {
  //   if (id) {
  //     fetchRestaurantById(id);
  //   }
  // }, [id]);
  return (
    <Col md={3}>
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          overflow: "hidden",
          height: "100%",
          boxShadow: "0 2px 8px rgba(42, 34, 34, 0.08)",
        }}
      >
        Restaurant List ({PAGE_SIZE})
        <SearchBar
          style={{ width: "100%" }}
          value={search}
          onChange={setSearch}
          placeholder="Search restaurants..."
        />
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            className="restaurant-card"
            style={{
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              marginTop: "10px",
              transition: "0.2s ease",
            }}
            // onClick={() => onSelectRestaurant(restaurant)}
            onClick={() => {
              navigate(
                `/dinemaster-ui/restaurants/${restaurant.id}`,
              ),
                onSelectRestaurant(restaurant);
            }}
          >
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                {/* Left Image */}
                <img
                  src="https://picsum.photos/100"
                  alt="Restaurant"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />

                {/* Right Content */}
                <div style={{ flex: 1 }}>
                  <Card.Title
                    style={{
                      marginBottom: "5px",
                      fontSize: "16px",
                    }}
                  >
                    {restaurant.name}
                  </Card.Title>

                  <Card.Text
                    style={{
                      marginBottom: "10px",
                      color: "#6c757d",
                      fontSize: "14px",
                    }}
                  >
                    {restaurant.cuisine}
                  </Card.Text>

                  <span
                    style={{
                      padding: "6px 14px",
                      borderRadius: "999px",
                      backgroundColor: restaurant.isOpen
                        ? "#dcfce7"
                        : "#fee2e2",
                      color: restaurant.isOpen
                        ? "#16a34a"
                        : "#dc2626",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: restaurant.isOpen
                          ? "#22c55e"
                          : "#ef4444",
                      }}
                    ></span>

                    {restaurant.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </Col>
  );
}
