import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import resetImg from "../img/reset_request.png"; 
import "./ResetRequest.css";

export default function ResetRequest() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/reset-request", { email });
      alert(`Token reset: ${res.data.token}`);
    } catch (err) {
      alert("Email không tồn tại");
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-image">
        <img src={resetImg} alt="Reset illustration" />
      </div>

      <div className="reset-form-wrapper">
        <button className="btn-back" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>

        <form onSubmit={handleRequest} className="reset-form">
          <h2 className="reset-title">Reset Password Request</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="reset-input"
            required
          />

          <button type="submit" className="reset-button">
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}
