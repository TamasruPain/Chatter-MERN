import React from 'react'
import bird from '../assets/bird.png'
import {Link} from "react-router-dom";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen backdrop-blur-sm w-full">
                <div className="m-10 p-5 bg-base-200/95 rounded-box">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                            src={bird}
                            alt="bird"
                            className="w-[25%]  rounded-lg shadow-2xl"
                        />
                        <div className=''>
                            <h1 className="text-5xl font-bold">Welcome to Chatter</h1>
                            <p className="py-6">
                                Chatter is a platform where you can chat with your friends and family. It
                                provides a simple and intuitive interface to communicate with others. You can send
                                messages, share images, and have fun conversations.
                            </p>
                            <Link className="btn btn-outline btn-warning mt-10" to={'/login'}>Get Started</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default HomePage
