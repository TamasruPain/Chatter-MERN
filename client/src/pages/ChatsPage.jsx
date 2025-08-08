import React from 'react'
import {useChatStore} from "../store/useChatStore.js";
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

const ChatsPage = () => {
    const {selectedUser} = useChatStore();

    return (
        <div className="backdrop-blur-lg ">
            <div className="md:flex hidden items-center justify-center p-5 px-4">
                <div className="bg-base-100/90 rounded-lg shadow-lg h-150 w-full max-w-6xl">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar/>
                        {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
                    </div>
                </div>
            </div>
            <div>
                <div className="md:hidden flex items-center h-screen justify-center">
                    <div className="bg-base-100/90 rounded-lg shadow-lg h-full w-full">
                        <div className="flex h-full w-full rounded-lg">
                            {!selectedUser ?<Sidebar/> : <ChatContainer/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatsPage
