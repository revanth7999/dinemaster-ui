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
];

export default menus;
