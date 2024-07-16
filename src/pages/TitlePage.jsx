import { Link } from "react-router-dom";


const TitlePage = () => {
    return (
        <div className="bg-[#5654D1] h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold font-nun">PocketBank</h1>
            <p className="font-light text-sm">Where your transactions are effortless and fast</p>
            <div className="text-black flex flex-row justify-center items-center gap-5 mt-5">
                <Link className="btn bg-[#5DFBC5] border-2 border-[#5DFBC5] hover:border-[#5DFBC5] 
                hover:bg-transparent hover:text-[#5DFBC5]">Log-In</Link>
                <Link className="btn bg-[#5DFBC5] border-2 border-[#5DFBC5] hover:border-[#5DFBC5] 
                hover:bg-transparent hover:text-[#5DFBC5]">Register</Link>
            </div>
        </div>
    );
};

export default TitlePage;