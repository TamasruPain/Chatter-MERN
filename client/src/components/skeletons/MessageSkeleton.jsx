import React from 'react'

const MessageSkeleton = () => {
    return (
        <div className="w-full">
            <div className="flex justify-between bg-base-200">
                <div className="flex flex-col p-5 gap-30">
                    <div className="skeleton h-15 w-52"></div>
                    <div className="skeleton h-15 w-52"></div>
                    <div className="skeleton h-15 w-52"></div>
                </div>
                <div className="flex flex-col justify-between mt-20 mb-10 gap-30 p-5">
                    <div className="skeleton h-15 w-52"></div>
                    <div className="skeleton h-15 w-52"></div>
                    <div className="skeleton h-15 w-52"></div>
                </div>
            </div>
        </div>
    )
}
export default MessageSkeleton
