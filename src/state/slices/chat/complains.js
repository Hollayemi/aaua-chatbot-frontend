import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';

const complainsApi = createAsyncThunk('post/pickups', async (auth) => {
    const { data } = await martApi
        .get('/complains', {
            headers: { auth },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });

    return data;
});
/*


*/

export const getComplains = (auth, dispatch, setState) => {
    dispatch(complainsApi(auth))
        .then(unwrapResult)
        .then((res) => {
            console.log(res.data);
            if (res.status === 'success') {
                setState(res.data);
            }
        })
        .catch();
};
/*




*/

const allComplainsApi = createAsyncThunk('post/pickups', async (auth) => {
    const { data } = await martApi
        .get('/all-complains', {
            headers: { auth },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });

    return data;
});
/*


*/

export const getAllComplains = (auth, dispatch, setState) => {
    dispatch(allComplainsApi(auth))
        .then(unwrapResult)
        .then((res) => {
            if (res.status === 'success') {
                setState(res.data);
            }
        })
        .catch();
};
