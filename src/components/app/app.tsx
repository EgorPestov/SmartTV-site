import { useEffect } from 'react';
import { VideoPlayer } from '../video-player/video-player';
import { BANNER_OPEN_DELAY_TIME, BANNER_CLOSE_DELAY_TIME } from '../../const';
import { Banner } from '../banner/banner';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getBannerShowStatus, getFormShowStatus, getVideoShowStatus, getWasFormShownStatus } from '../../store/banner-process/selectors';
import { setBannerStatus } from '../../store/banner-process/banner-process';
import { InputForm } from '../input-form/input-form';
import BackgroundImage from '../../assets/back-image.png'

export const App = () => {
  const dispatch = useAppDispatch();
  const isBannerShowing = useAppSelector(getBannerShowStatus);
  const isFormShowing = useAppSelector(getFormShowStatus);
  const isVideoShowing = useAppSelector(getVideoShowStatus);
  const wasFormShown = useAppSelector(getWasFormShownStatus);

  useEffect(() => {
    if (isVideoShowing && !wasFormShown) {
      const timeoutOpen = setTimeout(() => {
        dispatch(setBannerStatus(true));
      }, BANNER_OPEN_DELAY_TIME);

      const timeoutClose = setTimeout(() => {
        dispatch(setBannerStatus(false));
      }, BANNER_CLOSE_DELAY_TIME);

      return () => {
        clearTimeout(timeoutOpen);
        clearTimeout(timeoutClose);
      };
    }
  }, [dispatch, isVideoShowing, wasFormShown]);

  return (
    <>
      <VideoPlayer />
      {isBannerShowing && <Banner />}
      {(isFormShowing) && (
        <img className="background-image" src={BackgroundImage} alt="Banner Image" />
      )}
      {isFormShowing && <InputForm />}
    </>
  );
};
