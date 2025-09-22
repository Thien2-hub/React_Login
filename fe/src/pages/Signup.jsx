import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import googleIcon from "../img/btn_google.png";
import appleIcon from "../img/btn_apple.png";

import dogImg from "../img/dog.png";
import heoImg from "../img/heo.png";
import kongImg from "../img/kong.png";

import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const slides = [dogImg, heoImg, kongImg];
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slideWidth = track.clientWidth;
      const newIndex = Math.round(track.scrollLeft / slideWidth);
      setIndex(newIndex);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert("Bạn phải đồng ý điều khoản trước khi đăng ký!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3001/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      alert(res.data.message || "Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Có lỗi khi đăng ký, vui lòng kiểm tra lại."
      );
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
    <div className="signup-container">
      <div className="signup-left">
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
                />
              ))}
            </div>
            <button onClick={() => goTo(index + 1)} className="nav-btn">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="signup-right">
        <h2>Create an account</h2>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="name-fields">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="agree">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />{" "}
            I agree to the <Link to="/terms">Terms & Conditions</Link>
          </label>

          <button type="submit" className="btn-signup">
            Create account
          </button>
        </form>

        <div className="divider">
          <span>or register with</span>
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
