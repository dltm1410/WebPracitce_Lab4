import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faAt,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import "./FooterRight.css";

//need modification, footer running uncontrolable
function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
  onMuteToggle,
  getVideoUrl,
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPopup, setShowPopup] = useState(false); //popup for user
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [isMuted, setIsMuted] = useState(false);
  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000);
  };

  const parseLikesCount = (count) => {
    if (typeof count == "string") {
      if (count.endsWith("K")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  const formatLikeCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup); //toggle the popup
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    onMuteToggle?.(newMutedState);
  };

  //câu 4
  const handleSaveClick = async () => {
    try {
      const videoUrl = getVideoUrl();
      if (!videoUrl) {
        throw new Error("URL video không tồn tại");
      }
      await navigator.clipboard.writeText(videoUrl);
      setSaved(!saved);
      console.log("Đã copy URL video:", videoUrl);
    } catch (err) {
      console.error("Không thể copy URL:", err);
    }
  };
 
  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {profilePic ? (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: "45px", height: "45px", color: "#616161" }}
          />
        ) : null}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: "15px", height: "15px", color: "#ff0000" }}
          onClick={handleUserAddClick}
        />
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: "35px",
            height: "35px",
            color: liked ? "#ff0000" : "white",
          }}
          onClick={handleLikeClick}
        />
        <p>{formatLikeCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{comments}</p>
      </div>
      <div className="sidebar-icon">
        {saved ? (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: "35px", height: "35px", color: "#ffc107" }}
            onClick={handleSaveClick}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: "35px", height: "35px", color: "white" }}
            onClick={handleSaveClick}
          />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: "35px", height: "35px", color: "white" }}
          onClick={togglePopup}
        />
        <p>{shares}</p>

        <div className="sidebar-icon">
          <FontAwesomeIcon
            icon={isMuted ? faVolumeMute : faVolumeHigh}
            style={{ width: "35px", height: "35px", color: "white" }}
            onClick={handleMuteToggle}
          />
        </div>

        <div className="sidebar-icon record">
          <img
            src="https://static.thenounproject.com/png/934821-200.png"
            alt="Record icon"
          />
        </div>
      </div>
      {/* Share Popup */}
      {showPopup && (
        <div className="share-popup">
          <button className="close-popup" onClick={togglePopup}>
            X
          </button>
          <div className="share-options">
            <div className="share-option">
              <FontAwesomeIcon icon={faFacebook} className="share-icon" />
              <p>Facebook</p>
            </div>
            <div className="share-option">
              <FontAwesomeIcon icon={faInstagram} className="share-icon" />
              <p>Instagram</p>
            </div>
            <div className="share-option">
              <FontAwesomeIcon icon={faAt} className="share-icon" />
              <p>Thread</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
