import { CloseButton } from "../close-button/close-button";
import { useAppDispatch } from "../../hooks/use-app-dispatch/use-app-dispatch";
import { setFormStatus, setVideoStatus } from "../../store/banner-process/banner-process";

export const InputForm = () => {
    const dispatch = useAppDispatch();

    return (
    <div
        className="close-button"
        onClick={() => {
            dispatch(setFormStatus(false));
            dispatch(setVideoStatus(true));
        }}
    >
        <CloseButton />
    </div>
);}