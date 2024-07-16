import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import TitlePage from "../pages/TitlePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <TitlePage></TitlePage>
            }
        ]
    },
]);
export default router;