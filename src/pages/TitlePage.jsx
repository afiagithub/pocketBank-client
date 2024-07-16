import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TitlePage = () => {
    const {user, logOut} = useContext(AuthContext);
    const handleSigOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged Out")
            })
    }
    return (
        <div className="bg-[#5654D1] h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold font-nun">PocketBank</h1>
            <p className="font-light text-sm">Where your transactions are effortless and fast</p>
            <div className="">
                {
                    user? <NavLink onClick={handleSigOut} className="btn bg-[#5DFBC5] border-2 border-[#5DFBC5] hover:border-[#5DFBC5] 
                    hover:bg-transparent hover:text-[#5DFBC5] text-lg font-bold">LogOut</NavLink> :
                    <div className="text-black flex flex-row justify-center items-center gap-5 mt-5">
                        <Link to={'/login'} className="btn bg-[#5DFBC5] border-2 border-[#5DFBC5] hover:border-[#5DFBC5] 
                hover:bg-transparent hover:text-[#5DFBC5] text-lg font-bold">Log-In</Link>
                <Link to={'/register'} className="btn bg-[#5DFBC5] border-2 border-[#5DFBC5] hover:border-[#5DFBC5] 
                hover:bg-transparent hover:text-[#5DFBC5] text-lg font-bold">Register</Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default TitlePage;