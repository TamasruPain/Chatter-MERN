import React from 'react'
import {FaGithub} from "react-icons/fa";
import {IoLogoLinkedin} from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal backdrop-blur-2xl bg-black/50 text-neutral-content items-center p-5">
            <aside className="grid-flow-col items-center">
                <p>Copyright © 2025 - All right reserved by tamasrupain02@gmail.com</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href={"https://github.com/TamasruPain"} target={"_blank"}>
                    <FaGithub size={30}/>
                </a>
                <a href={"https://www.linkedin.com/in/tamasrupain/"} target={"_blank"}>
                    <IoLogoLinkedin size={30}/>
                </a>
            </nav>
        </footer>
    )
}
export default Footer
