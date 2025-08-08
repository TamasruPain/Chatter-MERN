import React from 'react'
import {useChatStore} from "../store/useChatStore.js";
import {useAuthStore} from "../store/useAuthStore.js";
import profileAvatar from '../assets/profile-avatar.png'
import {X} from "lucide-react";

const ChatHeader = () => {

    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

    return (
        <div className="p-2 border-b border-base-300 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/*Avatar*/}
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={selectedUser.profilePic || `${profileAvatar}`} alt={selectedUser.fullName}/>
                        </div>
                    </div>
                    {/*User info*/}
                    <div>
                        <h3>{selectedUser.fullName}</h3>
                        <p className="text-sm text-base-content/20">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                <button onClick={() => {
                    setSelectedUser(null)
                }}>
                    <X/>
                </button>
            </div>
        </div>
    )
}
export default ChatHeader
