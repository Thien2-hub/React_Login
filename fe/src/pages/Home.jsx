import { useState } from "react";
import { useNavigate } from "react-router-dom";
import khiImage from "../img/khi.png";
import "./Home.css"; 

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Home Page</h1>
      <button className="open-popup-btn" onClick={() => setShowPopup(true)}>
        Mở popup
      </button>

      {showPopup && (
         <div className="popup-overlay">
          <div className="popup">
            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>
            <div className="popup-left">
  <img src={khiImage} alt="popup" />
</div>


            <div className="popup-right">
              <h2>Chào mừng bạn</h2>
              <p>Vui lòng chọn </p>
              <button
                className="popup-btn login-btn"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
              <button
                className="popup-btn signup-btn"
                onClick={() => navigate("/signup")}
              >
                Đăng ký
              </button>
              <button
                className="close-btn"
                onClick={() => setShowPopup(false)}
              >
                
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
