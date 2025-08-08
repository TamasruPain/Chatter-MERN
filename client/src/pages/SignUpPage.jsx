import React, {useState} from 'react'
import {useAuthStore} from "../store/useAuthStore.js";
import bird from "../assets/bird.png";
import {Link} from "react-router-dom";
import {Eye, EyeOff, Loader2, Lock, LucideMail, User} from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {

    const [showSignupPassword, setShowSignupPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const {signUp, isSigningUp} = useAuthStore()

    const validateForm = () => {
        if (!formData.fullName.trim())
            return toast.error("Full Name is required");
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
        if (!formData.fullName || !formData.email || !formData.password) {
            return toast.error("Please fill all fields");
        }
        const ValidationSuccess = validateForm()
        if (ValidationSuccess) {
            return signUp(formData);
        }
    }

    return (
        <div className="grid lg:grid-cols-2 gap-5 h-screen backdrop-blur-lg">
            {/* left side  */}
            <div className="flex-col justify-center items-center gap-6 text-center hidden lg:flex">
                <img
                    src={bird}
                    alt="bird"
                    className="w-[30%]  rounded-lg shadow-2xl"
                />
                <h1 className="text-4xl font-bold mb-4">Welcome to Chatter</h1>
                <p className="text-lg mb-6">Please sign up to continue</p>
            </div>
            {/*  right side  */}
            <div className='flex flex-col justify-center items-center'>
                <fieldset className="fieldset bg-base-200/90 rounded-box w-xs p-4">
                    <legend className="fieldset-legend text-2xl">SignUp</legend>

                    <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-4'>
                        <div>
                            <label className="label"><User className='size-4 '/> Full Name</label>
                            <input type="text" className="input border-none bg-black/20" placeholder="Name"
                                   value={formData.fullName}
                                   onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            />
                        </div>
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
                                <input type={showSignupPassword ? "text" : "password"}
                                       className="input bg-black/20 border-none"
                                       placeholder="Password"
                                       value={formData.password}
                                       onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button type="button"
                                        className="btn bg-black/20 px-3"
                                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                                        disabled={isSigningUp}
                                >
                                    {showSignupPassword ? (
                                        <EyeOff className="size-4"/>
                                    ) : (
                                        <Eye className='size-4'/>
                                    )}
                                </button>
                            </div>

                        </div>
                        <button type='submit' className="btn btn-soft mt-10">
                            {isSigningUp ? (
                                <>
                                    <Loader2 className='size-4 animate-spin'/>
                                    loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    <p className="flex items-center justify-center m-5 text-base-content/50">Already have an
                        account?{" "}
                        <Link className='link text-blue-400' to={'/login'}>Login</Link>
                    </p>
                </fieldset>
            </div>
        </div>
    )
}
export default SignUpPage
