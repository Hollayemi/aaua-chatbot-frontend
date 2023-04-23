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

/*




*/

const updateComplainsApi = createAsyncThunk('post/pickups', async (payload) => {
    const { data } = await martApi
        .patch('/update-complain', payload.body, {
            headers: { auth: payload.auth },
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

export const updateComplain = (auth, info, dispatch, setState) => {
    const payload = {
        body: {
            ...info,
        },
        auth,
    };
    dispatch(updateComplainsApi(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.status === 'success') {
                setState(res.data);
            }
        })
        .catch();
};
