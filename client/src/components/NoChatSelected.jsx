import React from 'react'
import {LucideBird, LucideChefHat} from "lucide-react";

const NoChatSelected = () => {
    return (

        <div className="flex flex-col bg-base-200 items-center rounded-lg justify-center w-full">
            <LucideBird/>
            <h1 className="text-2xl font-bold mb-4">No Chat Selected</h1>
            <p className="text-gray-500">Select a chat to start messaging.</p>
        </div>

    )
}
export default NoChatSelected
