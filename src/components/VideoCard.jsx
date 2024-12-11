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
  // Change 5
  const [showInfo, setShowInfo] = useState(false);
  // Change 5
  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
    // change 5
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        setShowInfo((prev) => !prev);
      }
      if (e.key === "Escape") {
        setShowInfo(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // Change 5
  }, [autoplay]);
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
  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  // Change 2
  const handleMuteToggle = (isMuted) => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  };
  // Change 2
  // Change 5
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
