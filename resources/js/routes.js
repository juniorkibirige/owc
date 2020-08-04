import Home from "./views/user/Dashboard/Dashboard";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
import Tables from "./views/Tables/Tables"
import Stats from "./components/Stats";
import Category from "./components/Category"
import PoliceForm from "./components/PoliceForm";
// import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-white",
    miniName: 'Dash',
    component: Stats,
    layout: "/dashboard"
  },
  {
    path: "/tables",
    name: "Complaints",
    icon: "fa fa-eye text-white",
    miniName: "C",
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
    collapse: true,
    name: "Settings",
    state: "settingsCollapse",
    icon: "ni ni-ungroup text-orange",
    views: [
        {
          path: "/settings/category",
          name: "Category",
          icon: "ni ni-planet text-white",
          classes: "pl-md-6",
          miniName: "Cat",
          component: Category,
          layout: "/dashboard"
        },
    ]
  }
];
export default routes;
