import React, {useEffect, useState} from 'react'
import {useChatStore} from "../store/useChatStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import {Users2} from "lucide-react";
import profileAvatar from '../assets/profile-avatar.png'
import {useAuthStore} from "../store/useAuthStore.js";

const Sidebar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUserLoading} = useChatStore();

    const {onlineUsers} = useAuthStore();

    const [searchTerm, setSearchTerm] = useState("")


    useEffect(() => {
        getUsers();
    }, [getUsers])

    if (isUserLoading) {
        return <SidebarSkeleton/>
    }

    const filteredUsers = users.filter(e =>
        e.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <aside className="h-136 md:h-130 lg:h-190 xl:h-160">
            <div className="ml-6">
                <div className="flex items-center mt-5 mb-2 gap-3">
                    <Users2 size={50}/>
                    <div className="ml-2 mr-4 w-full">
                        <input
                            type="search"
                            className="input bg-base-100/50 placeholder:text-gray-400 p-2 rounded-md"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-80 p-2 overflow-y-auto rounded-lg">
                <ul className="space-y-2 rounded-lg">
                    {/* Placeholder for user list items */}
                    {filteredUsers.map((user) => (

                        <li key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center p-2 hover:bg-gray-700/20 rounded-lg cursor-pointer 
                            ${selectedUser?._id === user._id ? "bg-base-300" : "bg-base-200/80"}`}>
                            <div className="avatar">
                                <div className="relative mx-auto w-auto h-13">
                                    <img
                                        src={user.profilePic || `${profileAvatar}`}
                                        alt={user.fullName}
                                        className="object-cover rounded-full"
                                    />
                                    {onlineUsers.includes(user._id) && (
                                        <span
                                            className="absolute bottom-0 right-0 size-3 mb-1 bg-green-500 rounded-full"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="font-semibold">{user.fullName}</h3>
                                <p className="text-sm text-gray-500">{onlineUsers.includes(user._id) ? "Online" : "Offline"}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
export default Sidebar
