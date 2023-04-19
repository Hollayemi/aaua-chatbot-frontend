import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

const sendChatApi = createAsyncThunk('post/chat', async (payload) => {
    const data = await martApi
        .post('/chat', payload.body, {
            headers: { auth: payload.auth },
        })
        .then((res) => {
            return [
                { msg: payload.body.text, by: 'me' },
                { msg: res.data.message, by: 'ictac' },
            ];
        })
        .catch((err) => {
            return err;
        });

    return data;
});

const initialState = {
    messages: [],
    loading: false,
    status: 'idle',
    wasGoing: 'no-where',
    error: {},
};

const chatSlice = createSlice({
    name: 'ictac-chatbot',
    initialState,
    getInitialState: (state) => console.log(state),
    extraReducers: {
        [sendChatApi.pending]: (state) => {
            return {
                ...initialState,
                ...state,
                status: REQUEST_STATUS.PENDING,
                loading: true,
            };
        },
        [sendChatApi.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                messages: [...state.messages, ...payload],
                status: REQUEST_STATUS.FULFILLED,
                loading: false,
            };
        },
        [sendChatApi.rejected]: (state, error) => {
            console.log(error);
            return {
                ...initialState,
                ...state,
                status: REQUEST_STATUS.REJECTED,
                error: error,
            };
        },
    },
});

export default chatSlice.reducer;

/*





*/

export const chatTextHandler = (text, auth, dispatch) => {
    const payload = {
        body: {
            text,
        },
        auth,
    };
    dispatch(sendChatApi(payload))
        .then(unwrapResult)
        .then((res) => {
            // if (res.status === 'success') {
            //     setState(res.data);
            // }
            if (res.error) {
                toaster.push(
                    <Message showIcon type="error">
                        {res.error}
                    </Message>,
                    {
                        placement: 'bottomCenter',
                    }
                );
            }
        })
        .catch();
};
