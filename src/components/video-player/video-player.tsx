import { useRef, useState } from 'react';

import Video from '../../assets/videos/Volvo Trucks - The Epic Split feat. Van Damme (Live Test).webm';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getVideoShowStatus } from '../../store/banner-process/selectors';

export const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isVideoShowing = useAppSelector(getVideoShowStatus);

  return (
    <div className={isVideoShowing ? '' : 'visually-hidden'}>
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        loop
        muted
        onClick={handleVideoClick}
      >
        <source 
        src={Video} 
        type="video/webm" 
        />
      </video>
    </div>
  );
};
