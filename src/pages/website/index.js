import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatBox from '../../components/website/bookModal';
import HomeWrapper from '../../components/website/HomeWrapper';
import { Table } from 'rsuite';
import { getComplains } from '../../state/slices/chat/complains';
// import AvailablePickup from './available_pickup';
const Home = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const myData = userData && userData.data ? userData.data : null;
    const [myLogs, setLogs] = useState([]);
    const dispatch = useDispatch();
    let auth = myData?._id + ' ' + myData?.accessToken;
    useEffect(() => {
        getComplains(auth, dispatch, setLogs);
    }, [auth, dispatch]);

    return (
        <HomeWrapper userData={myData}>
            <div className="absolute top-0 left-0 h-full w-full overflow-auto">
                <div className="flex items-center pt-10 md:pt-0 flex-col sm:flex-row justify-evenly">
                    <div className="w-full flex flex-col justify-center sm:w-3/4 md:w-1/2 h-[400px] md:h-screen px-6 md:px-24">
                        <h3 className="font-black text-center md:text-left text-[25px] md:text-[30px]">
                            Welcome to AAUA ICTAC CHATBOT
                        </h3>
                        <h5 className="text-sm mt-4 text-center md:text-left">
                            I can provide answers to frequently asked questions,
                            assist with simple tasks like reporting avers
                            issues, payment issues, or even describe any locaton
                            for you.
                        </h5>
                        <h5 className="text-blue-700 mt-3 text-center md:text-left">
                            # I am still under training to help you more
                        </h5>
                        <div className="flex justify-center md:justify-start">
                            <button className="h-10 w-48 bg-blue-600 mt-3 font-bold text-white rounded-md drop-shadow-sm">
                                View Complains
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:mt-10">
                        <ChatBox userData={myData} />
                    </div>
                </div>
                <div className=" mx-3 md:mx-24 mb-24 bg-slate-50 rounded-md mt-6 min-w-[280px]">
                    <div className="flex items-center justify-between mr-3 w-full">
                        <h5 className="text-md py-2 font-bold text-slat-800 px-2 pt-3">
                            Complains
                        </h5>
                        <></>
                    </div>
                    <div className="w-full md:full shadow-lg">
                        <Table height={400} data={myLogs}>
                            <Table.Column width={50} fixed>
                                <Table.HeaderCell>s/n</Table.HeaderCell>
                                <Table.Cell dataKey={'_id'} />
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Complains</Table.HeaderCell>
                                <Table.Cell dataKey="message" />
                            </Table.Column>
                            <Table.Column width={200} resizable>
                                <Table.HeaderCell>Parameter</Table.HeaderCell>
                                <Table.Cell dataKey="parameter" />
                            </Table.Column>
                            <Table.Column width={200} resizable>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.Cell dataKey="status" />
                            </Table.Column>
                            <Table.Column width={200} resizable>
                                <Table.HeaderCell>Feedback</Table.HeaderCell>
                                <Table.Cell dataKey="feedback" />
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.Cell dataKey="createdAt" />
                            </Table.Column>
                        </Table>
                    </div>
                </div>
            </div>
        </HomeWrapper>
    );
};

export default Home;
