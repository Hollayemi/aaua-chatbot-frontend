import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookBus from '../../components/website/bookModal';
import HomeWrapper from '../../components/website/HomeWrapper';
import { Table } from 'rsuite';
import { getAllComplains } from '../../state/slices/chat/complains';
// import AvailablePickup from './available_pickup';
const Home = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const myData = userData && userData.data ? userData.data : null;
    const [myLogs, setLogs] = useState([]);
    const dispatch = useDispatch();
    let auth = myData?._id + ' ' + myData?.accessToken;
    useEffect(() => {
        getAllComplains(auth, dispatch, setLogs);
    }, [auth, dispatch]);
    console.log(myLogs);
    return (
        <HomeWrapper userData={myData}>
            <div className="absolute top-0 left-0 h-full w-full overflow-auto">
                <div className="flex items-center pt-10 md:pt-0 flex-col sm:flex-row justify-evenly">
                    <div className="w-full flex justify-between items-center h-[46px] mt-5 md:mt-16 border-b-2 px-2 md:px-24">
                        <h3 className="font-black text-center md:text-left text-14 md:text-14">
                            Super Admin Dashboard
                        </h3>
                        <h5>{myData?.name.substring(0, 20) + '...'}</h5>
                    </div>
                </div>
            </div>
        </HomeWrapper>
    );
};

export default Home;
