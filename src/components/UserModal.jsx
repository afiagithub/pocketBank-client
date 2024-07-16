import { IoMdClose } from "react-icons/io";

const UserModal = ({ data }) => {
    const { name, email, mobile, balance, role, status } = data;
    return (
        <div className="text-center modal-box h-full pt-12">
            <h2 className="text-2xl font-bold my-5">{name}</h2>
            <div className="text-left ml-6 md:ml-10">
                <p className="my-5 text-xl font-bold">User Information: </p>
                <p className="font-bold">Email: <span className="text-[#20B2AA]">{email}</span></p>
                <p className="font-bold">Mobile: <span className="text-[#20B2AA]">{mobile}</span></p>
                <p className="font-bold">Role: <span className="text-[#20B2AA]">{role}</span></p>
                <p className="font-bold">Total balance: <span className="text-[#20B2AA]">{balance}</span></p>
                <p className="font-bold">Status: <span className="text-[#20B2AA]">{status}</span></p>
            </div>
            <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn mr-5 bg-red-600 border-2 border-transparent text-white font-black text-xl 
                    hover:bg-transparent hover:border-red-600 hover:text-red-600"><IoMdClose /></button>
                </form>
            </div>
        </div>
    );
};

export default UserModal;