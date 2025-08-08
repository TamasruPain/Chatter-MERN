import React, {useState} from 'react'
import bird from "../assets/bird.png";
import {Link} from "react-router-dom";
import {Eye, EyeOff, Loader2, Lock, LucideMail} from "lucide-react";
import {useAuthStore} from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const LoginPage = () => {

    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {login, isLoggingIn} = useAuthStore()

    const validateLoginForm = () => {
        if (!formData.email.trim())
            return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Email is invalid");
        if (!formData.password)
            return toast.error("Password is required");
        if (formData.password.length < 6)
            return toast.error("Password must be at least 6 characters long");

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return toast.error("Please fill all fields");
        }
        const ValidationSuccess = validateLoginForm()
        if (ValidationSuccess) {
            return login(formData);
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 backdrop-blur-lg">

            {/* left side  */}
            <div className="flex-col justify-center items-center gap-6 text-center hidden lg:flex">
                <img
                    src={bird}
                    alt="bird"
                    className="w-[30%]  rounded-lg shadow-2xl"
                />
                <h1 className="text-4xl font-bold mb-4">Welcome to Chatter</h1>
                <p className="text-lg mb-6">Please login to continue</p>
            </div>
            {/*  right side  */}
            <div className='flex justify-center items-center'>
                <fieldset className="fieldset bg-base-200/90 rounded-box w-xs p-4">
                    <legend className="fieldset-legend text-2xl">Login</legend>

                    <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-4'>
                        <div>
                            <label className="label"><LucideMail className='size-4'/> Email</label>
                            <input type="email" className="input border-none bg-black/20" placeholder="Email"
                                   value={formData.email}
                                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="label"><Lock className='size-4'/>Password</label>
                            <div className="flex gap-1">
                                <input type={showLoginPassword ? "text" : "password"}
                                       className="input bg-black/20 border-none"
                                       placeholder="Password"
                                       value={formData.password}
                                       onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button type="button"
                                        className="btn bg-black/20 px-3"
                                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                                >
                                    {showLoginPassword ? (
                                        <EyeOff className="size-4"/>
                                    ) : (
                                        <Eye className='size-4'/>
                                    )}
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-soft mt-10" disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className='size-4 animate-spin'/>
                                    loading...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>
                    <p className="flex items-center justify-center m-5 text-base-content/50">Don't have an account?{" "}
                        <Link className='link text-blue-400' to={'/signup'}>Sign Up</Link>
                    </p>
                </fieldset>
            </div>
        </div>
    )
}
export default LoginPage
