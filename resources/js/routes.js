import Home from "./views/user/Dashboard/Dashboard";
import Tables from "./views/Tables/Tables"
import Stats from "./components/Stats";
import Category from "./components/Category"
import PoliceForm from "./components/PoliceForm";

const routes = [
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
        path: "/report",
        name: "Reports",
        icon: "fa fa-form",
        component: Home,
        layout: '/dashboard'
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
