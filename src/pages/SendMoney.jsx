import Swal from 'sweetalert2'
import useAxiosSecure from '../hooks/useAxiosSecure';
import getUser from '../hooks/getUser';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from '../components/LoadingSpinner';

const SendMoney = () => {
    const axiosSecure = useAxiosSecure();
    const [currentUser, isLoading] = getUser();
    const handleSend = async (e) => {
        e.preventDefault();
        const form = e.target;
        const mobile = form.mobile.value;
        const pin = parseInt(form.pin.value);
        let amount = parseInt(form.amount.value);
        const currBal = parseInt(currentUser.balance);

        if(parseInt(currentUser.pin) !== pin){
            return toast.warning("Enter correct Pin")
        }
        else if(currBal < amount){
            return toast.warning("You have insufficient balance")
        }        
        else if(amount < 50){
            return toast.warning("The amount has to be at least 50 Taka")
        }
        else if(amount > 100){
            amount = amount + 5;
            if(currBal < amount){
                return toast.warning("You have insufficient balance")
            }
        }

        const newTransaction = {
            user: currentUser.name,
            email: currentUser.email,
            mobile: currentUser.mobile,
            rcvr_mobile: mobile,
            amount
        }
        console.log(newTransaction);

        const res = await axiosSecure.post(`/transac`, newTransaction);
        if (res.data.insertedId) {
            Swal.fire({
                title: "Successful",
                text: "Added New Banner",
                icon: "success"
            });
        }
        else{
            Swal.fire({
                title: "Unsuccessful",
                text: "Provide proper receiver mobile number",
                icon: "error"
            });
        }

    }
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="flex flex-col lg:flex-row justify-center min-h-screen">
            <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                <div className="w-full">
                    <h1 className="text-2xl font-semibold font-ubuntu tracking-wider text-gray-800 capitalize ">
                        Send Money Through PocketBank
                    </h1>

                    <form onSubmit={handleSend} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">Receiver's Mobile Number</label>
                            <input name="mobile" type="number" placeholder="Enter Receiver's Number"
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">PIN Number</label>
                            <input name="pin" type="number" placeholder="Enter Your 5 digit PIN"
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">Amount</label>
                            <input name="amount" type="number" placeholder="Enter Amount"
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                        </div>
                        <button className="btn col-span-2 bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                    hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8] text-lg">
                            Send Money</button>
                    </form>
                </div>
            </div>

            <div className="md:-ml-5 block lg:w-2/5">
                <img className="h-32 lg:h-full w-full object-cover"
                    src="https://i.ibb.co/2s1ZKNd/test.jpg" alt="" />
            </div>
        </div>
    );
};

export default SendMoney;