import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { email, pin } = data;
        const newPin = pin + "a"
        signInUser(email, newPin)
            .then((result) => {
                if (result.user)
                    navigate(`/dashboard`)
                toast.success("Successfully Logged In")
            })
            .catch(() => {
                toast.error("Invalid Credential")
            });
    }    
    return (
        <div className="flex flex-col max-w-md mx-auto p-6 rounded-md sm:p-10 mb-10">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold text-[#5654D1] font-nun">Sign in</h1>
                <p className="text-sm dark:text-[#2D3663]">Sign in to access your account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" placeholder="Your Name" {...register("email", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.email && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <label className="text-sm">PIN (5 digit)</label>
                        <input type="number" name="pin" id="pin" placeholder="*****" {...register("pin", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.pin && <span className="text-red-700 font-semibold">This field is required</span>}
                </div>
                <div className="space-y-2">
                    <div>
                        <input type="submit" value="Sign In"
                            className="w-full px-8 py-3 bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                                hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8] rounded-xl font-bold" />
                    </div>
                    <p className="px-6 text-sm text-center dark:text-[#47CCC8]">Don't have an account yet?
                        <Link to="/register" className="hover:underline dark:text-[#2D3663] font-bold">
                            Sign up</Link>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;