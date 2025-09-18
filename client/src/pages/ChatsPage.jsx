import React from 'react'
import { useChatStore } from "../store/useChatStore.js";
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

const ChatsPage = () => {
    const { selectedUser } = useChatStore();

    return (
        <div className="backdrop-blur-lg h-screen">
            <div className="md:flex hidden items-center justify-center px-4 ">
                <div className="bg-base-100/90 rounded-lg shadow-lg w-full m-5 max-w-6xl">
                    <div className="flex rounded-lg overflow-hidden">
                        <Sidebar />
                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>

            <div>
                <div className="md:hidden flex items-center justify-center">
                    <div className="bg-base-100/90 rounded-lg shadow-lg w-full max-w-6xl">
                        <div className="flex w-full rounded-lg overflow-hidden">
                            {!selectedUser ? <Sidebar /> : <ChatContainer />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatsPage
