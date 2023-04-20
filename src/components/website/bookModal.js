import React, { useState } from 'react';
import { chatTextHandler } from '../../state/slices/chat';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/aaua-logo.png';

const ChatBox = ({ userData }) => {
    const dispatch = useDispatch();
    let auth = userData?._id + ' ' + userData?.accessToken;

    const { messages, status } = useSelector(
        (state) => state.reducer.chatSlice
    );
    const [text, setText] = useState('');
    const [keepText, setKeepText] = useState('');
    let myMessages = messages;
    if (status === 'PENDING') {
        myMessages = [
            ...messages,
            { msg: keepText, by: 'me' },
            { msg: '...', by: 'ictac' },
        ];
    }
    const sendMessage = () => {
        setKeepText(text);
        setText('');
        chatTextHandler(text, auth, dispatch);
    };

    return (
        <section className="flex items-center justify-center">
            <div className="m-2 w-[360px] sm:w-[400px] relative h-[450px] shadow border bg-white rounded-lg px-2 md:px-5 py-2">
                <div className="flex justify-between items-center my-4">
                    <h5 className="font-black text-md md:text-md text-black ml-2">
                        Log your complaint
                    </h5>
                    <h5 className="text-xs text-slate-400">
                        (
                        {userData
                            ? userData.matricNo +
                              ', ' +
                              userData.name.substring(0, 8) +
                              '...'
                            : 'no acount'}
                        )
                    </h5>
                </div>
                {/* flex flex-col justify-end */}
                <div className="scroller relative h-[350px] myScroll website-main-bg-image -mt-2 w-full  flex flex-col overflow-y-auto">
                    {myMessages?.map((res, i) => {
                        return (
                            <div className="w-full" key={i}>
                                {res.by === 'me' && (
                                    <MyMessage message={res.msg} />
                                )}
                                {res.by === 'ictac' && (
                                    <BotMessage message={res.msg} />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center w-full pr-9 mb-2 absolute bottom-0 justify-between text-xs my-1">
                    <input
                        placeholder="Message"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-9/12 border h-8 rounded-md px-2 text-[12px] shadow-xs"
                    />

                    <h5
                        onClick={sendMessage}
                        className="h-8 text-center leading-8 rounded-md px-2 w-20 bg-blue-500 text-sm text-white"
                    >
                        Send
                    </h5>
                </div>
            </div>
        </section>
    );
};

export default ChatBox;

const BotMessage = ({ message }) => (
    <div className="flex justify-start pr-10">
        <div className="relative my-2 bg-blue-700 rounded-r-md text-white w-fit min-w-20 max-w-48 px-2 py-3 shadow-md">
            <img
                src={logo}
                alt="aaua-logo"
                className="h-8 w-8 absolute top-2 left-2 rounded-full drop-shadow-sm"
            />
            <h5 className="text-white pl-10 -mt-1 w-full">{message}</h5>
        </div>
    </div>
);

const MyMessage = ({ message }) => (
    <div className="flex justify-end pl-10">
        <div className="relative my-2 bg-slate-200 rounded-l-md float-right text-black w-fit min-w-20 max-w-28 px-2 py-3 shadow-md">
            <h5 className="h-8 w-8 leading-8 text-center bg-white absolute top-2 right-2 rounded-full drop-shadow-sm">
                OS
            </h5>
            <h5 className="text-slate-900 pr-11 w-full">{message}</h5>
        </div>
    </div>
);
