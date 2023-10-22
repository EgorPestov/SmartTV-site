import { useRef, useState } from 'react';

import Video from '../../assets/videos/Volvo Trucks - The Epic Split feat. Van Damme (Live Test).webm';

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

  return (
    <div>
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
