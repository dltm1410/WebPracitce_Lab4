import React, { useRef, useEffect, useState } from "react";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import VideoInfo from "./VideoInfo";
import "./VideoCard.css";
// Change 5:  uploadDate, views, duration, tags, userAvatar
const VideoCard = (props) => {
  const {
    url,
    username,
    description,
    song,
    likes,
    shares,
    comments,
    saves,
    profilePic,
    setVideoRef,
    autoplay,
    uploadDate,
    views,
    duration,
    tags,
    userAvatar,
  } = props;

  const videoRef = useRef(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Pause all other videos when this one starts playing
      const handlePlay = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
          if (v !== video && !v.paused) {
            v.pause();
          }
        });
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      // Create Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When video is 50% visible
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              video.play().catch(() => {
                console.log('Autoplay prevented');
              });
            } else {
              video.pause();
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the video is visible
        }
      );

      // Start observing the video element
      observer.observe(video);

      // Add event listeners
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      // Cleanup
      return () => {
        observer.unobserve(video);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [autoplay]);

  const handleMuteToggle = (isMuted) => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      // If unmuting, ensure this video is playing and others are paused
      if (!isMuted && videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Change 5
  const handleScroll = (e) => {
    if (e.deltaX > 0) {
      setShowInfo(true);
    }
    if (e.deltaX < 0) {
      setShowInfo(false);
    }
  };
  // CHang 5
  const videoData = {
    username,
    userAvatar: profilePic,
    uploadDate,
    views,
    duration,
    description,
    tags,
  };

  // câu 5: hàm lấy url hiện tại
  const getVideoUrl = () => {
    if (videoRef.current) {
      return videoRef.current.src;
    }
    return "";
  };
  // Change 5: HandleScroll
  return (
    <div className="video" onWheel={handleScroll}>
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>
        <div className="footer-right">
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            /* Change */
            onMuteToggle={handleMuteToggle}
            /* Change */
            //gọi hàm
            getVideoUrl={getVideoUrl}
          />
        </div>
      </div>
      /* Change */
      <VideoInfo isVisible={showInfo} videoData={videoData} />
    </div>
  );
};

export default VideoCard;
