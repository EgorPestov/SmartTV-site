import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

export type ProductsProcessType = {
    isVideoShowing: boolean;
    isBannerShowing: boolean;
    isFormShowing: boolean;
    wasFormShown: boolean;
}

export const initialState: ProductsProcessType = {
    isVideoShowing: true,
    isBannerShowing: false,
    isFormShowing: false,
    wasFormShown: false,
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
        setFormShownStatus: (state, action: PayloadAction<boolean>) => {
            state.wasFormShown = action.payload;
        },
    },
});

export const { setBannerStatus, setFormStatus, setVideoStatus, setFormShownStatus } = bannerProcessSlice.actions;
