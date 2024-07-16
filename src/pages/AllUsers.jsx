import { useQuery } from "@tanstack/react-query";
import { MdBlock } from "react-icons/md";
import { useState } from "react";
import Swal from 'sweetalert2'
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import UserModal from "../components/UserModal";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const [modal, setModal] = useState({ show: true, data: null });
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleDetails = async (user) => {
        await setModal({ show: true, data: user })
        document.getElementById('my_modal_1').showModal()
    }

    const handleActive = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Activate User Account?"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/active-user/${id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Successful!",
                        text: "User Account is now Active.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }
    

    const handleBlock = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Block User?"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/block-user/${id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Successful!",
                        text: "User is now Blocked.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">All users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Make Active</th>
                            <th>Block</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map(user => <tr key={user._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <th>
                                    <button className="btn bg-[#4796c899] border-2 border-transparent text-[#2D3663] 
                                    hover:bg-transparent hover:border-[#2D3663]"
                                        onClick={() => handleDetails(user)}>
                                        See Info
                                    </button>
                                </th>
                                <th>
                                    {
                                        user.status === 'active' ? 'Active' : <button onClick={() => handleActive(user._id)}
                                            className="btn bg-[#5DFBC5] border-2 border-transparent text-black 
                                        font-black text-xl 
                                        hover:bg-transparent hover:border-[#5DFBC5] hover:text-[#5DFBC5]">
                                            <MdBlock />
                                        </button>
                                    }
                                </th>
                                <th>
                                    {
                                        user.status === 'blocked' ? 'Blocked' : <button onClick={() => handleBlock(user._id)}
                                            className="btn bg-red-600 border-2 border-transparent text-white 
                                        font-black text-xl 
                                        hover:bg-transparent hover:border-red-600 hover:text-red-600">
                                            <MdBlock />
                                        </button>
                                    }
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
                {modal.show && modal.data &&
                    <dialog id="my_modal_1" className="modal">
                        <UserModal data={modal.data} ></UserModal>
                    </dialog>}
            </div>
        </div>
    );
};

export default AllUsers;