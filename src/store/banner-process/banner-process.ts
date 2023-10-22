import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

export type ProductsProcessType = {
    isVideoShowing: boolean;
    isBannerShowing: boolean;
    isFormShowing: boolean;
    isSuccessShowing: boolean;

}

export const initialState: ProductsProcessType = {
    isVideoShowing: true,
    isBannerShowing: false,
    isFormShowing: false,
    isSuccessShowing: false,

};

export const bannerProcessSlice = createSlice({
    name: NameSpace.Banner,
    initialState,
    reducers: {
        setVideoStatus: (state, action: PayloadAction<boolean>) => {
            state.isVideoShowing = action.payload;
        },
        setBannerStatus: (state, action: PayloadAction<boolean>) => {
            state.isBannerShowing = action.payload;
        },
        setFormStatus: (state, action: PayloadAction<boolean>) => {
            state.isFormShowing = action.payload;
        },
        setSuccessStatus: (state, action: PayloadAction<boolean>) => {
            state.isSuccessShowing = action.payload;
        },
    },
});

export const { setBannerStatus, setFormStatus, setSuccessStatus, setVideoStatus } = bannerProcessSlice.actions;
