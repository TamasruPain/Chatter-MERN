import React from 'react'
import {Link} from "react-router-dom";
import {HomeIcon, MessageCircle, User} from "lucide-react";
import {useChatStore} from "../store/useChatStore.js";

const Dock = () => {
    const {setSelectedUser} = useChatStore();

    return (
        <div className=" block lg:hidden ">
            <div className="dock backdrop-blur-2xl bg-black/50 text-neutral-content">
                <button>
                    <Link to={'/'} className="dock-label flex flex-col items-center justify-center">
                        <HomeIcon/>Home
                    </Link>
                </button>

                <button>
                    <Link to={'/chats'}
                          onClick={() => {
                              setSelectedUser(null)
                          }}
                          className="dock-label flex flex-col items-center justify-center">
                       <MessageCircle/> Chats
                    </Link>
                </button>

                <button>
                    <Link to={'/Profile'} className="dock-label flex flex-col items-center justify-center">
                        <User/> Profile
                    </Link>
                </button>
            </div>
        </div>
    )
}
export default Dock
