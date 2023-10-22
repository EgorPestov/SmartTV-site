import { useState, useEffect } from 'react';
import { VideoPlayer } from '../video-player/video-player';
import { BANNER_DELAY_TIME } from '../../const';
import { Banner } from '../banner/banner';

export const App = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowBanner(true);
    }, BANNER_DELAY_TIME);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <VideoPlayer />
      {showBanner && (
        <Banner />
      )}
    </>
  );
};
