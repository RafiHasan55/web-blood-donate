import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";
import AddBooks from "../pages/CreateDonationRequest";
import AllUsers from "../pages/AllUsers";
import AvailableBooks from "../pages/AvailableBooks";
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
        path: "/available-books",
        element: <AvailableBooks />,
      },
      {
  path: "/about",
  element: <AboutUsPage></AboutUsPage>
},
      {
  path: "/blog",
  element: <PublicBlogPage />,
},
{
  path: "/search",
  element: <SearchDonorPage />,
},


      {
        path: "/details/:bookId",
        element: <DetailsPage />,
        loader: async ({ params }) => {
          const { data } = await axios.get(
            `http://localhost:5000/details/${params.bookId}`
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
