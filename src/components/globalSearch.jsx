import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_LANDING_PAGE, LANDING_PAGE, RES_PAGE } from './Constants';

export default function GlobalSearch() {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = ref.current;

    const handler = (selectedMenuOption) => {
    const selectedOption = selectedMenuOption.detail;
    const token = localStorage.getItem("authToken");
    let role = null;
    if (token) {
        try {
        const decoded = jwtDecode(token);
        role = decoded?.roles[0] || null;
        } catch (err) {
        console.error("Invalid token", err);
        }
    }
    if (selectedOption === "Restaurants") {
        navigate(RES_PAGE);
    } else if (selectedOption === "Menu") {
        navigate(LANDING_PAGE);
    } else if (selectedOption === "Admin Dashboard") {
        if (role === "ADMIN") {
        navigate(ADMIN_LANDING_PAGE);
        } else {
        setAlertMessage(
            "You do not have permission to access Admin Dashboard!",
        );
        setShowAlert(true);
        }
    } else {
        alert(`${selectedOption} page is under construction!`);
    }
    };

    el?.addEventListener('itemSelected', handler);
    return () => el?.removeEventListener('itemSelected', handler);
  }, []);

  return (
    <dm-search-menu
      ref={ref}
      items={[
        'Menu',
        'Admin Dashboard',
        'Restaurants',
        'Orders'
      ]}
      placeholder="Search menu..."
    />
  );
}
