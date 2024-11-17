import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./TopNavbar.css";

const TopNavbar = ({ onSearch }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Kiểm soát hiển thị popup
  const [hashtag, setHashtag] = useState(""); // Lưu hashtag người dùng nhập

  // Xử lý khi người dùng nhấn vào biểu tượng tìm kiếm
  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle popup
  };

  // Xử lý khi nhấn phím "Enter" trong ô tìm kiếm
  const handleEnterKey = (e) => {
    if (e.key === "Enter" && hashtag.trim()) {
      onSearch(hashtag.trim()); // Gửi hashtag tới App
      setIsSearchVisible(false); // Đóng popup
    }
  };

  // Xử lý khi nhấn nút "Search"
  const handleSearchSubmit = () => {
    if (hashtag.trim()) {
      onSearch(hashtag.trim()); // Gửi hashtag tới App
      setIsSearchVisible(false); // Đóng popup
    }
  };

  return (
    <div className="top-navbar">
      {/* Biểu tượng TV */}
      <FontAwesomeIcon icon={faTv} className="icon" />
      <h2>
        Following | <span>For you</span>
      </h2>

      {/* Biểu tượng tìm kiếm */}
      <FontAwesomeIcon
        icon={faSearch}
        className="icon"
        onClick={handleSearchClick}
      />

      {/* Popup tìm kiếm */}
      {isSearchVisible && (
        <div className="search-popup">
          <input
            type="text"
            placeholder="Search hashtags"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)} // Cập nhật hashtag khi người dùng nhập
            onKeyDown={handleEnterKey} // Lắng nghe sự kiện "Enter"
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
