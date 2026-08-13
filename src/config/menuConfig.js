const menus = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "Restaurants",
    path: "/restaurants",
  },
  {
    id: 3,
    label: "Orders",
    path: "/orders",
  },
  {
    id: 4,
    label: "Admin Dashboard",
    path: "/admin",
    roles: ["ADMIN"],
  },
  {
    id: 5,
    label: "Product",
    path: "/product",
  },
];

export default menus;
