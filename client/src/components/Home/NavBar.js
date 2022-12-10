import React, { Fragment } from "react";
import iconWhite from '../../assests/image/icon-white.png'
import grapWhite from '../../assests/image/graph-white.png'
import configWhite from '../../assests/image/config-white.png'
import userWhite from '../../assests/image/user-white.png'

const NavBar = () => {
    return (
        <>
            <nav className="pt-[16px] pb-[8px] flex justify-between items-center max-w-[620px] m-auto border-b-[1px] border-[#c93f3f]">
                <div>
                    <a className="flex items-center" href="/">
                        <img className="mr-[8px] w-[20px] h-[20px]" src={iconWhite} alt="logo"></img>
                        <span className="text-white font-bold text-[20px]">Pomofocus</span>
                    </a>
                </div>
                <div className="flex text-white text-[14px]">
                    <div className="navbar__icon">
                        <img className="mr-[4px] w-[16px] h-[16px]" src={grapWhite} alt="img" />
                        <span>Report</span>
                    </div>
                    <div className="navbar__icon">
                        <img className="mr-[4px] w-[16px] h-[16px]" src={configWhite} alt="img" />
                        <span>Setting</span>
                    </div>
                    <div className="navbar__icon">
                        <img className="mr-[4px] w-[16px] h-[16px]" src={userWhite} alt="img" />
                        <span>Login</span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;