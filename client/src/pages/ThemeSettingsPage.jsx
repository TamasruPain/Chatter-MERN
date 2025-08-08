import React from 'react'
import ThemeSettings from "../components/ThemeSettings.jsx";
import ChatThemePreview from "../components/ChatThemePreview.jsx";

const ThemeSettingsPage = () => {
    return (
        <div className="backdrop-blur-md">
            <ThemeSettings/>
            <ChatThemePreview/>
        </div>
    )
}
export default ThemeSettingsPage
