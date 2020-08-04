import Home from "./views/user/Dashboard/Dashboard";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
import Tables from "./views/Tables/Tables"
import Stats from "./components/Stats";
import PoliceForm from "./components/PoliceForm";
// import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-white",
    component: Stats,
    layout: "/dashboard"
  },
  {
    path: "/tables",
    name: "Complaints",
    icon: "fa fa-eye text-white",
    component: Tables,
    layout: "/dashboard"
  },
  {
    path: "/complain",
    name: "Add New Complain",
    icon: "fa fa-eye text-white",
    component: PoliceForm,
    hidden: true,
    layout: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "Reports",
    icon: "fa fa-reply",
    component: Home,
    layout: "/dashboard"
  },
  {
    collapse: true,
    // path: "/settings",
    name: "Settings",
    state: "settingsCollapse",
    icon: "ni ni-ungroup text-orange",
    views: [
        {
          path: "/icons",
          name: "Icons",
          icon: "ni ni-planet text-blue",
          miniName: "I",
          component: Stats,
          layout: "/dashboard"
        },
        {
          path: "/maps",
          name: "Maps",
          icon: "ni ni-pin-3 text-orange",
          miniName: "I",
          component: Stats,
          layout: "/dashboard"
        },
    ]
  }
//   {
//     path: "/icons",
//     name: "Icons",
//     icon: "ni ni-planet text-blue",
//     component: Icons,
//     layout: "/admin"
//   },
//   {
//     path: "/maps",
//     name: "Maps",
//     icon: "ni ni-pin-3 text-orange",
//     component: Maps,
//     layout: "/admin"
//   },
//   {
//     path: "/user-profile",
//     name: "User Profile",
//     icon: "ni ni-single-02 text-yellow",
//     component: Profile,
//     layout: "/admin"
//   },
//   {
//     path: "/tables",
//     name: "Tables",
//     icon: "ni ni-bullet-list-67 text-red",
//     component: Tables,
//     layout: "/admin"
//   },
//   {
//     path: "/login",
//     name: "Login",
//     icon: "ni ni-key-25 text-info",
//     component: Login,
//     layout: "/auth"
//   },
//   {
//     path: "/register",
//     name: "Register",
//     icon: "ni ni-circle-08 text-pink",
//     component: Register,
//     layout: "/auth"
//   }
];
export default routes;
