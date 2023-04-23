import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

const adminLoginApi = createAsyncThunk('post/kem_admin', async (payload) => {
    const { data } = await martApi
        .post('/admin-login', {
            ...payload,
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });

    return data;
});

const initialState = {
    adminData: {},
    loading: false,
    status: 'idle',
    wasGoing: 'no-where',
    error: {},
};

const AdminSlice = createSlice({
    name: 'aauaAdminLogin',
    initialState,
    reducers: {
        adminLogout: () => {
            console.log('hkjljdw');
            return initialState;
        },
    },
    extraReducers: {
        [adminLoginApi.pending]: (state) => {
            return {
                ...initialState,
                status: REQUEST_STATUS.PENDING,
                loading: true,
            };
        },
        [adminLoginApi.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                adminData: payload,
                status: REQUEST_STATUS.FULFILLED,
                loading: false,
            };
        },
        [adminLoginApi.rejected]: (state, error) => {
            return {
                ...initialState,
                status: REQUEST_STATUS.REJECTED,
                error: error,
            };
        },
    },
});

// export states
export const { adminLogout } = AdminSlice.actions;
export default AdminSlice.reducer;

/*





*/

export const AdminLogin = (formData, navigate, dispatch) => {
    dispatch(adminLoginApi(formData))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            if (res.status === 'success') {
                navigate('/admin');
            }
        })
        .catch((err) => {
            toaster.push(
                <Message showIcon type={'error'}>
                    No Connection
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
        });
};
