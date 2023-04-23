import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { REQUEST_STATUS } from '../../state/slices/constants';

const AuthOutlet = ({ to }) => {
    const { userData, status } = useSelector(
        (state) => state.reducer.loginReducer
    );
    let auth = false;
    if (status === REQUEST_STATUS.FULFILLED && userData.data._id) {
        auth = true;
    }
    return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthOutlet;
