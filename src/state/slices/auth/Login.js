import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

const shuttleLogin = createAsyncThunk('post/kem_signin', async (payload) => {
    const { data } = await martApi
        .post('/login', {
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
    userData: {},
    loading: false,
    status: 'idle',
    wasGoing: 'no-where',
    error: {},
};

const UserSlice = createSlice({
    name: 'aauaLogin',
    initialState,
    reducers: {
        userLogout: () => {
            return initialState;
        },
    },
    extraReducers: {
        [shuttleLogin.pending]: (state) => {
            return {
                ...initialState,
                status: REQUEST_STATUS.PENDING,
                loading: true,
            };
        },
        [shuttleLogin.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                userData: payload,
                status: REQUEST_STATUS.FULFILLED,
                loading: false,
            };
        },
        [shuttleLogin.rejected]: (state, error) => {
            return {
                ...initialState,
                status: REQUEST_STATUS.REJECTED,
                error: error,
            };
        },
    },
});

// export states
export const { userLogout } = UserSlice.actions;
export default UserSlice.reducer;

/*





*/

export const myLogin = (formData, navigate, dispatch) => {
    dispatch(shuttleLogin(formData))
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
                navigate('/');
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
