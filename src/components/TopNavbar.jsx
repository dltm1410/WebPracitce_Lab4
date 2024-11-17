import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./TopNavbar.css";

const TopNavbar = ({ onSearch }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Kiểm soát hiển thị popup
  const [hashtag, setHashtag] = useState(""); // Lưu hashtag người dùng nhập

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle popup
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && hashtag.trim()) {
      onSearch(hashtag.trim());
      setIsSearchVisible(false); // Đóng popup sau khi tìm kiếm
    }
  };

  const handleSearchSubmit = () => {
    if (hashtag.trim()) {
      onSearch(hashtag.trim());
      setIsSearchVisible(false); // Đóng popup sau khi tìm kiếm
    }
  };

  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className="icon" />
      <h2>
        Following | <span>For you</span>
      </h2>
      <FontAwesomeIcon
        icon={faSearch}
        className="icon"
        onClick={handleSearchClick}
      />
      {isSearchVisible && (
        <div className="search-popup">
          <input
            type="text"
            placeholder="Search hashtags"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            onKeyDown={handleEnterKey}
            className="search-input"
          />
          <button onClick={handleSearchSubmit} className="search-button">
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
