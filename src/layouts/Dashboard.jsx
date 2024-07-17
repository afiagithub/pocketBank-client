import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import LoadingSpinner from "../components/LoadingSpinner"
import useAgent from "../hooks/useAgent";

const Dashboard = () => {
    const { logOut } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isAgent, isAgentLoading] = useAgent();
    if (isAdminLoading || isAgentLoading) {
        <LoadingSpinner></LoadingSpinner>
    }
    const [show, setShow] = useState(false);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged Out")
            })
    }

    const handleCollaspe = () => {
        setShow(!show)
    }
    return (
        <div className="flex flex-row gap-5 relative">
            <div className="fixed md:hidden text-2xl pl-4 pt-5" onClick={handleCollaspe}>
                {
                    show ? <IoIosCloseCircleOutline /> :
                        <IoMdMenu />
                }

            </div>
            <div className={show ?
                'min-w-44 fixed md:hidden translate-y-12 bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4 transition-all duration-200 z-10'
                : 'fixed translate-y-12 md:hidden bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4 -translate-x-72 transition-all duration-200'}>
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
                        <hr />
                        {
                            isAdmin ? <ul className="font-semibold space-y-2 my-4">
                                <li><Link to='/dashboard'>Admin Profile</Link></li>
                                <li><Link to='/dashboard/manage'>User Management</Link></li>
                                <li><Link to='/dashboard/all-history'>System Monitoring</Link></li>
                            </ul> : isAgent ? <ul className="font-semibold space-y-2 font-ubuntu my-4">
                                <li><Link to='/dashboard'>My Profile</Link></li>
                                <li><Link to='/dashboard/test-result'>Transaction Management</Link></li>
                                <li><Link to='/dashboard/history'>Transaction History</Link></li>
                            </ul> :
                                <ul className="font-semibold space-y-2 font-ubuntu my-4">
                                    <li><Link to='/dashboard'>My Profile</Link></li>
                                    <li><Link to='/dashboard/send-money'>Send Money</Link></li>
                                    <li><Link to='/dashboard/cashout'>Cash-Out</Link></li>
                                    <li><Link to='/dashboard/test-result'>Cash-In</Link></li>
                                    <li><Link to='/dashboard/history'>Transaction History</Link></li>
                                </ul>
                        }
                    </div>
                    <div>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu my-4">
                            <li><button className="flex flex-row items-center justify-center gap-2"
                                onClick={handleLogOut}>LogOut <IoLogInOutline className="text-xl" /></button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="min-w-56 hidden md:flex min-h-screen bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4">
                <div className="flex flex-col justify-between h-full w-full">
                    <div>
                        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
                        <hr />
                        {
                            isAdmin ? <ul className="font-semibold space-y-2 my-4">
                                <li><Link to='/dashboard'>Admin Profile</Link></li>
                                <li><Link to='/dashboard/manage'>User Management</Link></li>
                                <li><Link to='/dashboard/all-history'>System Monitoring</Link></li>
                            </ul> : isAgent ? <ul className="font-semibold space-y-2 font-ubuntu my-4">
                                <li><Link to='/dashboard'>My Profile</Link></li>
                                <li><Link to='/dashboard/test-result'>Transaction Management</Link></li>
                                <li><Link to='/dashboard/history'>Transaction History</Link></li>
                            </ul> :
                                <ul className="font-semibold space-y-2 font-ubuntu my-4">
                                    <li><Link to='/dashboard'>My Profile</Link></li>
                                    <li><Link to='/dashboard/send-money'>Send Money</Link></li>
                                    <li><Link to='/dashboard/cashout'>Cash-Out</Link></li>
                                    <li><Link to='/dashboard/test-result'>Cash-In</Link></li>
                                    <li><Link to='/dashboard/history'>Transaction History</Link></li>
                                </ul>
                        }
                    </div>
                    <div>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu my-4">
                            <li><button className="flex flex-row items-center justify-center gap-2"
                                onClick={handleLogOut}>LogOut <IoLogInOutline className="text-xl" /></button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;