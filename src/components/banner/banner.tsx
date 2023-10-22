import { BannerImage } from "./banner-image"
import { useAppDispatch } from "../../hooks/use-app-dispatch/use-app-dispatch";
import { setBannerStatus, setVideoStatus, setFormStatus } from "../../store/banner-process/banner-process";

export const Banner = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="banner" >
            <BannerImage />
            <button
                className="ok-button"
                onClick={() => {
                    dispatch(setBannerStatus(false));
                    dispatch(setVideoStatus(false));
                    dispatch(setFormStatus(true));
                }}
            >
                ОК
            </button>
        </div>)
}

