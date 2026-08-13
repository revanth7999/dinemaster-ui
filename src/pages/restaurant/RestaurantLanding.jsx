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
import {
  ALL_REST,
  GET_USER_CART,
  RESTAURANTS,
} from "../../components/Constants";
import apiClient from "../../components/utils/axiosUtil";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import RestaurantPageHeader from "./RestaurantPageHeader";
import RestaurantPageList from "./RestaurantPageList";
import RestaurantPageDetails from "./RestaurantPageDetails";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartPage from "./CartPage";
import { clearCart, setCart } from "../../redux/cartSlice";

const RestaurantLanding = () => {
  // Component State
  const [selectedRestaurant, setSelectedRestaurant] =
    useState(null);
  const [userCartDetails, setUserCartDetails] = useState(
    [],
  );
  const [displayCart, setDisplayCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const cartItemCount =
    cart?.items?.reduce(
      (total, item) => total + item.quantity,
      0,
    ) || 0;

  // De-structuring
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  // Side-Effects
  useEffect(() => {
    document.title = RESTAURANTS;
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

  useEffect(() => {
    fetchCartByUserId(user.id);
  }, []);

  // Component Functions
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

  const fetchCartByUserId = async (userId) => {
    try {
      const response = await apiClient.get(
        `${GET_USER_CART}${userId}`,
      );
      const cartData = response.data.data;

      if (!cartData || cartData.length === 0) {
        dispatch(clearCart());
        return;
      }

      const firstItem = cartData[0];
      const reduxCart = {
        userId: userId,
        restaurantId: firstItem.restaurant.id,
        items: cartData.map((item) => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
          price: item.menuItem.price,
        })),
      };

      dispatch(setCart(reduxCart));
    } catch (error) {
      if (error.response?.status === 404) {
        // Backend says cart doesn't exist
        dispatch(clearCart());
        return;
      }
      console.error("Error fetching user cart:", error);
    }
  };

  return (
    <div
      style={{
        background: "#f4f6f9",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <RestaurantPageHeader
        updateDisplayCart={setDisplayCart}
        cartItemCount={cartItemCount}
      />
      <Container fluid className="px-2 px-md-3 py-3">
        <Row className="g-3">
          <RestaurantPageList
            onSelectRestaurant={setSelectedRestaurant}
            selectedRestaurant={selectedRestaurant}
          />
          <RestaurantPageDetails
            selectedRestaurant={selectedRestaurant}
            displayCart = {setDisplayCart}
          />
          {displayCart ? <CartPage /> : null}
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantLanding;
