import Home from "./views/user/Dashboard/Dashboard";
import Tables from "./views/Tables/Tables"
import Stats from "./components/Stats";
import Category from "./components/Category"
import Report from "./components/Report";

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
        collapse: true,
        path: "/supplier",
        name: "Supplier",
        state: "supplierCollapse",
        icon: "fa fa-eye text-white",
        views: [
            {
                path: "/supplier/list",
                name: "All Suppliers",
                icon: "fa fa-users text-white",
                classes: "pl-4",
                miniName: "+S",
                component: Category,
                layout: "/dashboard"
            },
            {
                path: "/supplier/create",
                name: "Add Supplier",
                icon: "fa fa-user-plus text-white",
                classes: "pl-4",
                miniName: "+S",
                component: Category,
                layout: "/dashboard"
            },
        ],
        miniName: "S",
        component: Tables,
        layout: "/dashboard"
    },
    {
        collapse: true,
        path: "/beneficiaries",
        name: "Beneficiaries",
        state: "beneficiariesCollapse",
        icon: "fa fa-users text-white",
        views: [
            {
                path: "/beneficiaries/list",
                name: "All Beneficiaries",
                icon: "fa fa-users text-white",
                classes: "pl-4",
                miniName: "AB",
                component: Category,
                layout: "/dashboard"
            },
            {
                path: "/beneficiaries/create",
                name: "Add Beneficiary",
                icon: "fa fa-user-plus text-white",
                classes: "pl-4",
                miniName: "+B",
                component: Category,
                layout: "/dashboard"
            },
        ],
        miniName: "B",
        component: Tables,
        layout: "/dashboard"
    },
    {
        collapse: true,
        path: "/inputs",
        name: "Inputs",
        state: "inputCollapse",
        icon: "fa fa-cubes text-white",
        views: [
            {
                path: "/inputs/list",
                name: "All Inputs",
                icon: "fa fa-cube text-white",
                classes: "pl-4",
                miniName: "AI",
                component: Category,
                layout: "/dashboard"
            },
            {
                path: "/inputs/create",
                name: "Add Input",
                icon: "fa fa-plus-circle text-white",
                classes: "pl-4",
                miniName: "+I",
                component: Category,
                layout: "/dashboard"
            },
        ],
        miniName: "I",
        component: Tables,
        layout: "/dashboard"
    },
    {
        path: "/report",
        name: "Reports",
        icon: "fas fa-file-contract",
        component: Report,
        layout: '/dashboard'
    },
    // {
    //     collapse: true,
    //     name: "Settings",
    //     state: "settingsCollapse",
    //     icon: "fa fa-cog text-orange",
    //     views: [
    //         {
    //             path: "/settings/category",
    //             name: "Category",
    //             icon: "ni ni-planet text-white",
    //             classes: "pl-md-4",
    //             miniName: "Cat",
    //             component: Category,
    //             layout: "/dashboard"
    //         },
    //     ]
    // }
];
export default routes;
