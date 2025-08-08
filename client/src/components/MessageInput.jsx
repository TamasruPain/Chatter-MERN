import React, {useRef, useState} from 'react'
import {useChatStore} from "../store/useChatStore.js";
import {Image, Send, X} from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {sendMessage,} = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error('Please select a valid image file.');
            return;
        }
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) {
            toast.error("Please enter a message or select an image.");
            return;
        }
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });
            // clear the form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } catch (error) {
            console.log("Failed to send message: ",error)
        }
    };

    return (
        <div className="p-3 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img src={imagePreview}
                             alt="Image preview"
                             className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 bg-red-500  rounded-full p-1
                            flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-4"/>
                        </button>
                    </div>
                </div>
            )}
            <form action={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg"
                        placeholder="Type your message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`hidden sm:flex btn btn-soft ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                    >
                        <Image size={22}/>
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-soft"
                        disabled={!text.trim() && !imagePreview}
                        onClick={handleSendMessage}
                    >
                        <Send size={22}/>
                    </button>

                </div>
            </form>
        </div>
    )
}
export default MessageInput
