import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import getUser from "../hooks/getUser";
import { TiTick } from "react-icons/ti";
import Swal from 'sweetalert2'

const TranManage = () => {
    const axiosSecure = useAxiosSecure();
    const [currentUser, isLoading, refetch] = getUser();
    const { data: requests = [], isLoading: tranLoading } = useQuery({
        queryKey: ['requests', currentUser.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cash-req/${currentUser.mobile}`)
            return res.data
        }
    })
    const handleAccept = async (tran) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Accept Cash In?"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/accept-req/${tran._id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Successful!",
                        text: "Transaction completed.",
                        icon: "success"
                    });                    
                }
                else{
                    Swal.fire({
                        title: "Unsuccessful!",
                        text: "Transaction Couldn't be done.",
                        icon: "error"
                    });
                }                
            }
            refetch()
        });
    }
    if (isLoading || tranLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Manage Cash Out Requests</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Mobile</th>
                            <th>Amount</th>
                            <th>Accept Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((tran, idx) => <tr key={tran._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{tran.user}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{tran.mobile}</td>
                                <td>BDT. {tran.amount}</td>
                                <td>{
                                        <button onClick={() => handleAccept(tran)}
                                        className="btn bg-[#5DFBC5] border-2 border-transparent text-black 
                                    font-black text-xl 
                                    hover:bg-transparent hover:border-[#5DFBC5] hover:text-[#5DFBC5]">
                                        <TiTick />
                                    </button>
                                    }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TranManage;