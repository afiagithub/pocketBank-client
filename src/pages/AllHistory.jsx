import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { data: histories = [], isLoading } = useQuery({
        queryKey: ['history'],
        queryFn: async () => {
            const res = await axiosSecure.get('/alltransac')
            return res.data
        }
    })
    if (isLoading) {
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
                            <th>Sender</th>
                            <th>Sender Mobile</th>
                            <th>Sender Email</th>
                            <th>Receiver Mobile</th>
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
                                            <div className="font-bold">{tran.user}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{tran.mobile}</td>
                                <td>{tran.email}</td>
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

export default AllHistory;