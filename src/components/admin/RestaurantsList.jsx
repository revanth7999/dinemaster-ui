import { useEffect, useState } from "react";
import {
  faStar,
  faStarHalfAlt,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiClient from "../../components/utils/axiosUtil";
import { ALL_REST } from "../../components/Constants";
import { isEmpty } from "../../components/utils/basicFunctions";
import "./RestaurantList.css";
import DataTable from "../../components/common/DataTable";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 50;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchRestaurants();
  }, [page, debouncedSearch]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `${ALL_REST}?page=${page}&size=${PAGE_SIZE}&search=${debouncedSearch}`,
      );
      const data = response.data.data;
      setRestaurants(data.content);
      setTotalPages(data.page.totalPages);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      const diff = rating - i;

      if (diff >= 1) {
        return (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            color="gold"
          />
        );
      }

      if (diff >= 0.5) {
        return (
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            color="gold"
          />
        );
      }

      return (
        <FontAwesomeIcon
          key={i}
          icon={faEmptyStar}
          color="gold"
        />
      );
    });
  };

  return (
    <div className="restaurant-wrapper">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search restaurants..."
      />

      <div className="restaurant-table-container">
        <DataTable
          columns={[
            "S.No",
            "Restaurant Name",
            "Cuisine",
            "Phone No",
            "Rating",
          ]}
          data={restaurants}
          emptyMessage="No restaurants found"
          renderRow={(restaurant, index) => (
            <tr key={restaurant.id}>
              <td>{index + 1 + page * PAGE_SIZE}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.cuisine}</td>
              <td>{restaurant.phone}</td>
              <td>{renderStars(restaurant.rating)}</td>
            </tr>
          )}
          loading={loading}
          skeletonRows={5}
        />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default RestaurantsList;
