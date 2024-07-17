import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import getUser from "../hooks/getUser";

const MyHistory = () => {
    const axiosSecure = useAxiosSecure();
    const [currentUser, isLoading] = getUser();
    const { data: histories = [], isLoading: tranLoading } = useQuery({
        queryKey: ['history', currentUser.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/transac/${currentUser.email}`)
            return res.data
        }
    })
    if (isLoading || tranLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Transaction History</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            histories.map((tran, idx) => <tr key={tran._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{tran.rcvr_mobile}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>BDT. {tran.amount}</td>
                                <td>{
                                    tran?.status ? tran.status : 'complete'
                                }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyHistory;