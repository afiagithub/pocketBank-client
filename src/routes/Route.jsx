import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import TitlePage from "../pages/TitlePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../layouts/Dashboard"
import PrivateRoute from "../private/PrivateRoute";
import Profile from "../pages/Profile";
import AllUsers from "../pages/AllUsers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <TitlePage></TitlePage>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                index: true,
                element:<Profile></Profile>
            },
            {
                path: 'manage',
                element: <AllUsers></AllUsers>
            }
        ]
    }
]);
export default router;