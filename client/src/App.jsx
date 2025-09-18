import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Navbar from "./components/Navbar.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {Loader} from "lucide-react";
import backgroundImage from './assets/birds02.png';
import {Toaster} from "react-hot-toast";
import {useThemeStore} from "./store/useThemeStore.js";
import ThemeSettingsPage from "./pages/ThemeSettingsPage.jsx";
import ChatsPage from "./pages/ChatsPage.jsx";
import Dock from "./components/Dock.jsx";

function App() {
    const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
    const {theme} = useThemeStore();

    console.log(onlineUsers)

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin"/>
            </div>
        );

    return (
        <Router>
            <div
                data-theme={theme}
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',

                }}>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/chats" element={authUser ? <ChatsPage/> : <Navigate to='/login'/>}/>
                    <Route path="/settings" element={<ThemeSettingsPage/>}/>
                    <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to='/login'/>}/>
                    <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to='/chats'/>}/>
                    <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to='/login'/>}/>
                </Routes>
                <Toaster/>
                <Dock/>
            </div>
        </Router>
    )
}

export default App
