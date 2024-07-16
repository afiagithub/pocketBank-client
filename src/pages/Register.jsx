import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useContext } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { fullName, pin, mobile, email, role } = data;
        if (pin.length < 5) {
            toast.error("PIN must be 5 digit long");
            return;
        }
        else if (mobile.length < 11) {
            toast.error("Mobile must be 11 digit long");
            return;
        }
        const newPin = pin + "a";
        createUser(email, newPin)
            .then(() => {
                updateUserProfile(fullName)
                    .then(async () => {
                        const userInfo = {
                            name: fullName,
                            email,
                            pin,
                            mobile,
                            role,
                            status: 'pending'
                        }
                        const res = await axiosPublic.post("/users", userInfo);
                        console.log(res);
                        if (res.data.insertedId) {
                            navigate('/dashboard')
                            toast.success("Successfully Registered")
                        }
                    });
            })
            .catch((error) => {
                console.log(error.message)
            });
    }
    return (
        <div className="flex flex-col max-w-md mx-auto p-6 rounded-md sm:p-10 mb-10">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold text-[#5654D1]">Register</h1>
                <p className="text-sm dark:text-secondary">Create your account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Full Name</label>
                        <input type="text" name="name" placeholder="Your Name" {...register("fullName")}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.fullName && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <label className="text-sm">PIN (5 digit)</label>
                        <input type="number" name="pin" id="pin" placeholder="*****" {...register("pin", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.pin && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <label className="block mb-2 text-sm">Mobile</label>
                        <input type="number" name="mobile" placeholder="Your Mobile Number" {...register("mobile")}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.mobile && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <label className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" placeholder="Your Email Address" {...register("email", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.email && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <label className="block mb-2 text-sm">Role</label>
                        <select className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            name="role" {...register("role")}>
                            <option value="user">User</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>
                    {errors.email && <span className="text-red-700 font-semibold">This field is required</span>}
                </div>
                <div className="space-y-2">
                    <div>
                        <input type="submit" value="Sign Up"
                            className="w-full px-8 py-3 bg-[#ff494a] text-white text-lg font-semibold rounded-xl 
                            border-2 border-[#ff494a] hover:border-[#ff494a] hover:bg-transparent 
                            hover:text-[#ff494a]" />
                    </div>
                    <p className="px-6 text-sm text-center dark:text-secondary">Already have an account?
                        <Link to="/login" className="hover:underline dark:text-[#ff494a] font-bold">
                            Sign in</Link>.
                    </p>
                </div>
            </form>

        </div>
    );
};

export default Register;