import { useEffect } from 'react';
import { VideoPlayer } from '../video-player/video-player';
import { BANNER_DELAY_TIME } from '../../const';
import { Banner } from '../banner/banner';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getBannerShowStatus, getFormShowStatus, getSuccessShowStatus } from '../../store/banner-process/selectors';
import { setBannerStatus } from '../../store/banner-process/banner-process';
import { InputForm } from '../input-form/input-form';
import BackgroundImage from '../../assets/back-image.png'

export const App = () => {
  const dispatch = useAppDispatch();
  const isBannerShowing = useAppSelector(getBannerShowStatus);
  const isFormShowing = useAppSelector(getFormShowStatus);
  const isSuccessShowing = useAppSelector(getSuccessShowStatus);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setBannerStatus(true));
    }, BANNER_DELAY_TIME);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  return (
    <>
      <VideoPlayer />
      {isBannerShowing && <Banner />}
      {(isFormShowing || isSuccessShowing) && (
        <img className="background-image" src={BackgroundImage} alt="Banner Image" />
      )}
      {isFormShowing && <InputForm />}
    </>
  );
};
