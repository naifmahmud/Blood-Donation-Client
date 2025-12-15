import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import BloodRequests from "../Pages/Blood Request/BloodRequests";
import Funding from "../Pages/Funding/Funding";
import Register from "../Pages/Authentication/Register";
import login from "../Pages/Authentication/login";

export const router= createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"/register",
                Component:Register
            },
            {
                path:"/login",
                Component:login
            },
            {
                path:"/bloodRequests",
                Component:BloodRequests
            },
            {
                path:"/funding",
                element:<Funding></Funding>
            }
        ]
    }
])