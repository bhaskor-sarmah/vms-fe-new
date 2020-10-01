import Sample from "../layouts/Sample";
import Driver from "../driver/Driver";
export const roleWiseRoutes = [
  {
    role: "mto_trip_manager",
    routes: [
      {
        id: 1,
        route: "/dashboard/driversettings",
        component: Driver,
        name: "Drivers",
        icon: "fas fa-user-friends",
      },
      {
        id: 2,
        route: "/dashboard/vehicle-entry",
        component: Sample,
        name: "Vehicles",
        icon: "fas fa-car-alt",
      },
      {
        id: 3,
        route: "/dashboard/trip",
        component: Sample,
        name: "Trip",
        icon: "fas fa-map-marked-alt",
      },
      {
        id: 4,
        route: "/dashboard/token",
        component: Sample,
        name: "Token",
        icon: "fas fa-qrcode",
      },
      {
        id: 5,
        route: "/dashboard/hiring-onfield",
        component: Sample,
        name: "Hiring On Field",
        icon: "fas fa-street-view",
      },
    ],
  },
  {
    role: "mto_admin",
    routes: [
      {
        id: 1,
        route: "/dashboard/tripsettings",
        component: Sample,
        name: "Trip",
        icon: "fas fa-map-marked-alt",
      },
      {
        id: 2,
        route: "/dashboard/tokensettings",
        component: Sample,
        name: "Token",
        icon: "fas fa-qrcode",
      },
      {
        id: 3,
        route: "/dashboard/settings",
        component: Sample,
        name: "Settings",
        icon: "fas fa-cogs",
      },
    ],
  },
];