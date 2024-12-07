import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import './VideoInfo.css';

const VideoInfo = ({ isVisible, videoData }) => {
  if (!isVisible) return null;

  return (
    <div className={`video-info ${isVisible ? 'visible' : ''}`}>
      <div className="video-info-header">
        <img 
          src={videoData.userAvatar}
          alt="User avatar" 
          className="user-avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'default-avatar.png';
          }}
        />
        <div className="user-info">
          <h3 className="username">
            {videoData.username}
            <FontAwesomeIcon icon={faCheckCircle} className="verified-icon" />
          </h3>
          <p className="upload-date">{videoData.uploadDate}</p>
        </div>
      </div>
      
      <div className="video-details">
        <div className="video-stats">
          <span className="views">{videoData.views} views</span>
          <span className="duration">{videoData.duration}</span>
        </div>
        <p className="video-description">{videoData.description}</p>
        <div className="video-tags">
          {videoData.tags?.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoInfo; 