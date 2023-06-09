import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newAccount } from '../../state/slices/auth/Signup';
import { toaster, Message } from 'rsuite';

const Signup = () => {
    const dispatch = useDispatch();
    const [confPass, setConfPass] = useState();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        matricNo: '',
        password: '',
    });
    let newValue = {};
    function updateValue(newVal, variable) {
        variable === 'name' && (newValue = { name: newVal });
        variable === 'email' && (newValue = { email: newVal });
        variable === 'matricNo' && (newValue = { matricNo: newVal });
        variable === 'password' && (newValue = { password: newVal });
        setFormData({
            ...formData,
            ...newValue,
        });
    }

    const signupHandler = (e) => {
        e.preventDefault();
        if (formData.password === confPass) {
            newAccount(formData, dispatch);
        } else {
            toaster.push(<Message type="error">Password not match</Message>, {
                placement: 'topCenter',
            });
        }
    };

    const fixedStyle =
        'border focus:border-red-100 w-full mb-4 bg-transparent rounded-md w-full h-9 px-4 py-1 ';

    return (
        <div className="website-main-bg-image h-full w-full absolute">
            <div className="absolute h-full w-full bg-slate-900 opacity-90"></div>
            <div className="flex items-center justify-center h-full w-full absolute top-0 left-0">
                <div className="flex items-center border border-slate-200 p-6 mx-1 md:w-[370px] bg-gray-100 rounded justify-center flex-col">
                    <h1 className="font-bold">Ictac-Bot Sign up</h1>
                    <div>
                        <form className="">
                            <input
                                className={fixedStyle}
                                placeholder="Name"
                                type="text"
                                onChange={(e) =>
                                    updateValue(e.target.value, 'name')
                                }
                            />

                            <input
                                className={fixedStyle}
                                placeholder="email"
                                type="text"
                                onChange={(e) =>
                                    updateValue(e.target.value, 'email')
                                }
                            />

                            <input
                                className={fixedStyle}
                                placeholder={'Enter your matric number'}
                                type="number"
                                onChange={(e) =>
                                    updateValue(e.target.value, 'matricNo')
                                }
                            />

                            <div className="w-full flex px-2 text-xs justify-end items-center">
                                <i className="fa fa-eye hover:text-blue-200 text-blue-100"></i>
                            </div>
                            <input
                                className={fixedStyle}
                                placeholder="password"
                                type="password"
                                onChange={(e) =>
                                    updateValue(e.target.value, 'password')
                                }
                            />

                            <div className="w-full flex px-2 text-xs justify-end items-center">
                                <i className="fa fa-eye hover:text-blue-200 text-blue-100"></i>
                            </div>
                            <input
                                className={fixedStyle}
                                placeholder="confirm password"
                                type="password"
                                onChange={(e) => setConfPass(e.target.value)}
                            />

                            <button
                                onClick={(e) => signupHandler(e)}
                                className="font-bold h-8 w-full bg-blue-500 text-white rounded-md shadow-lg"
                            >
                                Sign up
                            </button>

                            <div className="w-full flex px-2 font-bold text-xs justify-between mt-2 items-center">
                                <p className="text-sm text-blue-500">
                                    Already have account{' '}
                                </p>
                                <Link
                                    to="/signin"
                                    className="text-sm cursor-pointer hover:text-blue-700 text-blue-600"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
