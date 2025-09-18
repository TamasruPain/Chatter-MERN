import React, { useEffect, useRef } from 'react'
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { useChatStore } from "../store/useChatStore.js";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import profileAvatar from '../assets/profile-avatar.png'

const ChatContainer = () => {
    const messageEndRef = useRef(null)
    const { authUser } = useAuthStore()
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore()

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, unsubscribeFromMessages, subscribeToMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])


    if (isMessagesLoading) {
        return (
            <div className="flex flex-col w-full">
                <div className="flex-shrink-0">
                    <ChatHeader />
                </div>
                <div className="flex-1 p-4 overflow-y-auto min-h-0">
                    <MessageSkeleton />
                </div>
                <div className="flex-shrink-0">
                    <MessageInput />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-136 md:h-130 lg:h-190 xl:h-160 w-full">
            {/* Chat Header */}
            <div className="flex-shrink-0">
                <ChatHeader />
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-0">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center text-base-content/50">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message._id}
                            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                            ref={messageEndRef}
                        >
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full">
                                    <img src={
                                        message.senderId === authUser._id
                                            ? authUser.profilePic || `${profileAvatar}`
                                            : selectedUser.profilePic || `${profileAvatar}`
                                    }
                                        alt="profile pic"
                                    />
                                </div>
                            </div>
                            <div className="chat-header mb-1">
                                <time className="text-xs opacity-50 ml-1">
                                    {new Date(message.createdAt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}
                                </time>
                            </div>
                            <div className={`chat-bubble flex flex-col sm:max-w-[60%] shadow-md
                        ${message.senderId === authUser._id ? "bg-primary text-primary-content" : "bg-base-200"}`}>
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="sm:max-w-[200px] rounded-md mb-2"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Chat Input */}
            <div className="flex-shrink-0">
                <MessageInput />
            </div>
        </div>
    )
}
export default ChatContainer
