import React, {useState} from 'react'
import {useAuthStore} from "../store/useAuthStore.js";
import profileAvatar from '../assets/profile-avatar.png'
import {Camera, LucideMail, User} from "lucide-react";

const ProfilePage = () => {
    const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImage(base64Image);
            await updateProfile({profilePic: base64Image});
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center backdrop-blur-sm">
            <div className='card bg-base-100 shadow-xl w-full max-w-md'>
                <div className='flex flex-col  card-body'>
                    <h1 className='font-bold mb-4'>Profile</h1>
                    {/* user avatar upload section */}
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className="relative mb-2">
                            <img
                                src={ selectedImage || authUser.profilePic || `${profileAvatar}`}
                                alt='Profile'
                                className='rounded-full w-30 h-30 object-cover'
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
                                        ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`
                                }>
                                <Camera className="text-base-200" size="20"/>
                                <input
                                    type='file'
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className='text-lg mb-2'>
                            {isUpdatingProfile ? 'Updating profile...' : `Welcome, ${authUser.fullName || 'User'}`}
                        </p>
                    </div>
                    <div className="space-y-6 p-5">
                        <div className="space-y-1.5">
                            <p className="flex gap-2 items-center bg-gray-500 rounded-md p-3">
                                <User size="15"/>
                                <span>{authUser?.fullName}</span>
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="flex gap-2 items-center bg-gray-500 rounded-md p-3">
                                <LucideMail size="15"/>
                                <span>{authUser?.email}</span>
                            </p>
                        </div>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 gap-3 mt-5">
                            <legend className="fieldset-legend">Account Info</legend>
                            <div className="space-x-3 text-sm ">
                                <span>Member Since :</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="space-x-3 text-sm ">
                                <span>Account Status :</span>
                                <span className="">
                                    Active
                                </span>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage
