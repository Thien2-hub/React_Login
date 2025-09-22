import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import googleIcon from "../img/btn_google.png";
import appleIcon from "../img/btn_apple.png";

import dogImg from "../img/dog.png";
import heoImg from "../img/heo.png";
import kongImg from "../img/kong.png";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const slides = [dogImg, heoImg, kongImg];
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % slides.length;
        goTo(next);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      alert("Đăng nhập thành công!");
      console.log(res.data); 
      navigate("/");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Sai email hoặc mật khẩu";
      alert(msg);
    }
    
  };
const handleGoogleLogin = () => {
  alert("Bạn vừa bấm login Google");
   window.location.href = "http://localhost:3001/api/auth/google";
};

const handleAppleLogin = () => {
  alert("Bạn vừa bấm login Apple");
   window.location.href = "http://localhost:3001/api/auth/apple";
};


  return (
    <div className="login-container">
      <div className="login-left">
        <button className="btn-back" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>

        <div className="slideshow-wrapper">
          <div className="slideshow-track" ref={trackRef}>
            {slides.map((src, i) => (
              <div className="slide" key={i}>
                <img src={src} alt={`slide-${i}`} />
              </div>
            ))}
          </div>

          <div className="slideshow-controls">
            <button onClick={() => goTo(index - 1)} className="nav-btn">
              Prev
            </button>
            <div className="dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? "active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={() => goTo(index + 1)} className="nav-btn">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="login-right">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-login">
            Sign in
          </button>
        </form>

        <div className="extra-links">
          <p>
            <Link to="/reset-password">Forgot password?</Link>
          </p>
          <p>
            <Link to="/reset-request">Forgot request?</Link>
          </p>
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>

        <div className="divider">
          <span>or sign in with</span>
        </div>
        <div className="social-login">
  <button type="button" className="btn-google" onClick={handleGoogleLogin}>
        <img src={googleIcon} alt="Google" />
    Google
  </button>

  <button type="button" className="btn-apple" onClick={handleAppleLogin}>
        <img src={appleIcon} alt="Apple" />
    Apple
  </button>
</div>


      </div>
    </div>
  );
}
