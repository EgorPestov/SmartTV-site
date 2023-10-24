import { BannerImage } from "./banner-image"
import { useAppDispatch } from "../../hooks/use-app-dispatch/use-app-dispatch";
import { setBannerStatus, setVideoStatus, setFormStatus } from "../../store/banner-process/banner-process";
import { useRef, useEffect } from 'react';

export const Banner = () => {
    const dispatch = useAppDispatch();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    }, []);

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
                ref={buttonRef}
            >
                ОК
            </button>
        </div>)
}

