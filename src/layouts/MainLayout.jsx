import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div className="font-man">
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;