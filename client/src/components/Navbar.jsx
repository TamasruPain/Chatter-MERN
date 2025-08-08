import React from 'react'
import bird from "../assets/bird.png";
import {Link} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore.js";
import {LogIn, LogOut, Settings, User2} from "lucide-react";

const Navbar = () => {

    const {authUser, logout} = useAuthStore();

    return (
        <div className="navbar backdrop-blur-2xl bg-black/20 shadow-sm">
            <div className="navbar-start ml-2">
                <img
                    src={bird}
                    alt="bird"
                    className="w-[20%] md:w-[10%] rounded-lg shadow-2xl block lg:hidden"
                />
                <img
                    src={bird}
                    alt="bird"
                    className="w-[5%] lg:w-[8%] xl:w-[5%] rounded-lg shadow-2xl hidden lg:flex"
                />
                <Link className="text-xl ml-2" to={'/'}>Chatter</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><a>About</a></li>
                    <li><Link to={'/chats'}>Chats</Link></li>
                </ul>
            </div>

            {/* for large screens */}
            <div className="navbar-end hidden lg:flex gap-4">
                <Link to={'/settings'} className="btn btn-ghost">
                    <Settings className="size-4"/>
                    Themes
                </Link>
                {authUser ? (
                    <>
                        <Link to="/profile" className="btn btn-soft">

                            <User2 className="size-4"/>
                            Profile
                        </Link>
                        <button onClick={logout} className="btn btn-soft">
                            <LogOut className="size-4"/>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-soft">
                            <LogIn className="size-4"/>
                            Login
                        </Link>
                    </>
                )}
            </div>
            {/* for smaller screens */}
            <div className="navbar-end flex lg:hidden gap-3 mr-2">
                <Link to={'/settings'} className="btn btn-soft">
                    <Settings className="size-4"/>
                </Link>
                {authUser ? (
                    <>
                        <Link to="/profile" className="btn btn-soft">
                            <User2 className="size-4"/>
                        </Link>
                        <button onClick={logout} className="btn btn-soft">
                            <LogOut className="size-4"/>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-soft">
                            <LogIn className="size-4"/>
                            Login
                        </Link>
                    </>
                )}
            </div>

        </div>
    )
}
export default Navbar
