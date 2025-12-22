import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import BloodRequests from "../Pages/Blood Request/BloodRequests";
import Funding from "../Pages/Funding/Funding";
import Register from "../Pages/Authentication/Register";
import login from "../Pages/Authentication/login";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashBoard from "../Pages/Dashboard/MainDashBoard/MainDashBoard";
import CreateRequest from "../Pages/Dashboard/CreateDonationRequest/CreateRequest";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllBloodDonationRequest from "../Pages/Dashboard/All Blood Donation Request/AllBloodDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/My Donation Request/MyDonationRequests";
import PaymentSuccess from "../Pages/Payment Success/PaymentSuccess";
import Search from "../Components/Search/Search";
import BloodRequestDetails from "../Pages/Blood Request/BloodRequestDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: login,
      },
      {
        path: "/bloodRequests",
        Component: BloodRequests,
      },
      {
        path: "/bloodRequests/:id",
        element: (
          <PrivateRoute>
            <BloodRequestDetails></BloodRequestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "/payment_success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <MainDashBoard></MainDashBoard> },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/createRequest",
        element: <CreateRequest></CreateRequest>,
      },
      {
        path: "/dashboard/myDonationRequests",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "/dashboard/allBloodDontionRequest",
        element: <AllBloodDonationRequest></AllBloodDonationRequest>,
      },
    ],
  },
]);
