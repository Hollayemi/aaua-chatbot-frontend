import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeWrapper from '../../components/website/HomeWrapper';
import {
    getAllComplains,
    updateComplain,
} from '../../state/slices/chat/complains';
// import AvailablePickup from './available_pickup';
const Home = () => {
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    const myData = adminData && adminData.data ? adminData.data : null;
    const [myLogs, setLogs] = useState([]);
    const dispatch = useDispatch();
    let auth = myData?._id + ' ' + myData?.accessToken;
    useEffect(() => {
        getAllComplains(auth, dispatch, setLogs);
    }, [auth, dispatch]);
    console.log(myLogs);
    return (
        <HomeWrapper userData={myData} admin={true}>
            <div className="absolute top-0 left-0 h-full w-full overflow-auto">
                <div className="pt-10 md:pt-0 flex-col sm:flex-row justify-evenly">
                    <div className="w-full flex justify-between items-center h-[46px] mt-5 md:mt-16 border-b-2 px-2 md:px-24">
                        <h3 className="font-black text-center md:text-left text-14 md:text-14">
                            Super Admin Dashboard
                        </h3>
                        <h5>{myData?.name.substring(0, 20) + '...'}</h5>
                    </div>

                    <div className="mt-4 w-full px-16">
                        {myLogs.map((res, i) => (
                            <EachComplain
                                key={i}
                                data={res}
                                acc={myData}
                                auth={auth}
                                setLogs={setLogs}
                                dispatch={dispatch}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </HomeWrapper>
    );
};

export default Home;

const EachComplain = ({ data, acc, setLogs, dispatch, auth }) => {
    const [feedback, setFeedback] = useState('');
    const Resolved = () => {
        const payload = {
            id: data._id,
            ictacStaff: acc._id,
            feedback,
            status: 'resolved',
        };
        updateComplain(auth, payload, dispatch, setLogs);
        setFeedback('');
    };
    return (
        <div className="flex flex-col md:flex-row items-start justify-between py-5 px-2 border-b">
            <div>
                <h5 className="flex items-center">
                    Complain On:{' '}
                    <b className="ml-4 uppercase">{data.parameter}</b>
                </h5>
                <h5 className="w-48">{data.message}</h5>
            </div>
            <textarea
                placeholder="Feedback"
                onChange={(e) => setFeedback(e.target.value)}
                value={feedback}
                className="h-32 w-2/4 min-w-[300px] p-1 resize-none"
            />
            <div className="flex items-center">
                <h5
                    onClick={Resolved}
                    className="h-10 leading-10 w-32 m-2 text-center bg-green-600 mt-3 font-bold text-white rounded-md drop-shadow-sm"
                >
                    Resolved
                </h5>
                <h5 className="h-10 leading-10 w-32 m-2 text-center bg-red-600 mt-3 font-bold text-white rounded-md drop-shadow-sm">
                    Not Resolved
                </h5>
            </div>
        </div>
    );
};
