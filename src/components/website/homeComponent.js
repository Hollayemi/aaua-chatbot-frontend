import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHamburger, FaSignOutAlt } from 'react-icons/fa';
import { Drawer } from 'rsuite';
import { userLogout } from '../../state/slices/auth/Login';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../state/slices/auth/adminLogin';

export const Header = ({ userData, admin }) => {
    const dispatch = useDispatch();
    const [openNav, setNav] = useState(false);
    return (
        <div className="relative h-14">
            <div className="absolute top-0 left-0 h-full w-full bg-slate-900 shadow-md opacity-80"></div>
            <div className="flex items-center justify-between px-10 md:px-24 absolute left-0 top-0 w-full h-full">
                <Link to="/">
                    <h5 className="font-black text-xl Lucida text-white min-w-[100px]">
                        ICTAC-BOT
                    </h5>
                </Link>
                <div className="text-white justify-center hidden md:flex top-10">
                    <Urls
                        link="https://avers.aaua.edu.ng"
                        title="Visit AVERS"
                    />
                    <Urls
                        link="https://eduportal.aaua.edu.ng"
                        title="e-Portal"
                    />
                    {!userData?._id ? (
                        <>
                            <MyLinks link="/signin" title="Login" auth />
                            <MyLinks
                                link="/create-account"
                                title="Create account"
                                auth
                            />
                        </>
                    ) : admin ? (
                        <div
                            onClick={() => dispatch(adminLogout())}
                            className={`px-6 text-lg text-white py-1.5 cursor-pointer mx-0.5 rounded-sm hover:text-blue-200`}
                        >
                            <FaSignOutAlt />
                        </div>
                    ) : (
                        <div
                            onClick={() => dispatch(userLogout())}
                            className={`px-6 text-lg text-white py-1.5 cursor-pointer mx-0.5 rounded-sm hover:text-blue-200`}
                        >
                            <FaSignOutAlt />
                        </div>
                    )}
                </div>
                <i
                    onClick={() => setNav(!openNav)}
                    className="text-xl md:hidden text-white"
                >
                    <FaHamburger />
                </i>
            </div>
            <Drawer
                backdrop={true}
                open={openNav}
                onClose={() => setNav(false)}
                placement="left"
                size="xs"
            >
                <div className="h-full bg-red-600">
                    <Drawer.Header className="text-white shadow website-main-bg-image myAfter">
                        <div className="w-full flex relative website-main-bg-imag items-center justify-between px-5">
                            <h5 className="font-black text-xl ">
                                AAUA-CHATBOT
                            </h5>
                        </div>
                    </Drawer.Header>
                    <div className="h-full bg-slate-500 text-white px-3">
                        <Urls
                            link="https://avers.aaua.edu.ng"
                            title="Visit AVERS"
                            mystyle="mb-2"
                        />
                        <Urls
                            link="https://eduportal.aaua.edu.ng"
                            mystyle="mb-2"
                            title="e-Portal"
                        />
                        <div className="flex items-center">
                            {!userData?._id ? (
                                <>
                                    <MyLinks
                                        link="/signin"
                                        mystyle="mb-2"
                                        title="Login"
                                        auth
                                    />
                                    <MyLinks
                                        link="/create-account"
                                        title="Create account"
                                        auth
                                        mystyle="mb-2"
                                    />
                                </>
                            ) : (
                                <div
                                    onClick={userLogout}
                                    className={`px-6 text-lg flex items-center text-white py-1.5 cursor-pointer mx-0.5 rounded-sm hover:text-blue-200`}
                                >
                                    Logout <FaSignOutAlt className="ml-3" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

const MyLinks = ({ link, title, auth, mystyle }) => (
    <Link to={link}>
        <div
            className={`px-6 text-white ${
                auth && 'bg-blue-600'
            } ${mystyle} py-1.5 cursor-pointer mx-0.5 rounded-sm hover:text-blue-200`}
        >
            {title}
        </div>
    </Link>
);

const Urls = ({ link, title, auth, mystyle }) => (
    <a href={link}>
        <div
            className={`px-6 text-white ${
                auth && 'bg-blue-600'
            } ${mystyle} py-1.5 cursor-pointer mx-0.5 rounded-sm hover:text-blue-200`}
        >
            {title}
        </div>
    </a>
);
