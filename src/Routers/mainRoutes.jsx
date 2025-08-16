import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";

import AllUsers from "../pages/AllUsers";

import Dashboard from "../pages/Dashboard";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyBooks from "../pages/MyBooks";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/ProfilePage";
import CreateDonationRequest from "../pages/CreateDonationRequest";
import DonationDetails from "../pages/DonationDetails";
import EditDonationRequest from "../pages/EditDonationRequest";
import MyDonationRequests from "../pages/MyDonationRequests";
import AllBloodDonationRequests from "../pages/AllBloodDonationRequests";
import ContentManagementPage from "../pages/ContentManagementPage";
import AddBlogPage from "../pages/AddBlogPage";
import PublicBlogPage from "../pages/PublicBlogPage";
import SearchDonorPage from "../pages/SearchDonorPage";
import AboutUsPage from "../pages/AboutUsPage";
import PendingDonationRequests from "../pages/PendingDonationRequests";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import ContactUs from "../pages/ContactUs";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/donation-requests",
        element: <PendingDonationRequests />,
      },

      {
        path: "/donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/about",
        element: <AboutUsPage></AboutUsPage>,
      },
      {
        path: "/blog",
        element: <PrivateRoute>
          <PublicBlogPage />
        </PrivateRoute>,
      },
      {
        path: "/search",
        element: <SearchDonorPage />,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>
      },

      {
        path: "/details/:bookId",
        element: <DetailsPage />,
        loader: async ({ params }) => {
          const { data } = await axios.get(
            `https://for-mission-scic11-server-template.vercel.app/details/${params.bookId}`
          );
          return data;
        },
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "create-donation-request",
            element: <CreateDonationRequest></CreateDonationRequest>,
          },
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "my-books",
            element: <MyBooks />,
          },
          {
            path: "my-requests",
            element: <MyDonationRequests></MyDonationRequests>,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "content-management",
            element: <ContentManagementPage></ContentManagementPage>,
          },
          {
            path: "content-management/add-blog",
            element: <AddBlogPage></AddBlogPage>,
          },
          {
            path: "edit-donation/:id",
            element: <EditDonationRequest></EditDonationRequest>,
          },
          {
            path: "all-blood-donation-request",
            element: <AllBloodDonationRequests />,
          },
          {
            path: "donation-details/:id",
            element: <DonationDetails></DonationDetails>,
          },
        ],
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Register></Register>,
      },
      {},
    ],
  },
]);

export default mainRoutes;
