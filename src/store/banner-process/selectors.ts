import { State } from "../../hooks/use-app-selector/use-app-selector";

export const getVideoShowStatus = (state: State): boolean => state.isVideoShowing;
export const getBannerShowStatus = (state: State): boolean => state.isBannerShowing;
export const getFormShowStatus = (state: State): boolean => state.isFormShowing;
export const getWasFormShownStatus = (state: State): boolean => state.wasFormShown;
