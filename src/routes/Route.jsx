import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import TitlePage from "../pages/TitlePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../layouts/Dashboard"
import PrivateRoute from "../private/PrivateRoute";
import Profile from "../pages/Profile";
import AllUsers from "../pages/AllUsers";
import SendMoney from "../pages/SendMoney";
import MyHistory from "../pages/MyHistory";
import AllHistory from "../pages/AllHistory";
import AdminRoute from "../routes/AdminRoute"
import CashOut from "../pages/CashOut";
import CashIn from "../pages/CashIn"
import TranManage from "../pages/TranManage";

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
                path: 'send-money',
                element: <SendMoney></SendMoney>
            },
            {
                path: 'cashout',
                element: <CashOut></CashOut>
            },
            {
                path: 'cashin',
                element: <CashIn></CashIn>
            },
            {
                path: 'history',
                element: <MyHistory></MyHistory>
            },
            {
                path: 'req-manage',
                element: <TranManage></TranManage>
            },
            {
                path: 'manage',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'all-history',
                element: <AdminRoute><AllHistory></AllHistory></AdminRoute>
            }
        ]
    }
]);
export default router;