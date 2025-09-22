import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dunglaiImg from "../img/dunglai.png";
import "./ResetPassword.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");   
  const [loading, setLoading] = useState(false);

 const [newPassword, setNewPassword] = useState("");

const handleReset = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3001/api/auth/reset-password", { 
      token, 
      newPassword  
    });
    alert(res.data.msg);
  } catch (err) {
    alert("Reset thất bại");
  }
};


  return (
    <div className="reset-wrapper">
      <div className="reset-image">
        <img src={dunglaiImg} alt="Illustration" />
      </div>

      <form className="reset-form" onSubmit={handleReset}>
        <h2 className="reset-title">Đặt lại mật khẩu</h2>
        <p className="reset-subtitle">
          Nhập token nhận được trong email và mật khẩu mới của bạn
        </p>

        <input
          type="text"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="reset-input"
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="reset-input"
          required
        />

        <button type="submit" className="reset-button" disabled={loading}>
          {loading ? "Đang xử lý..." : "Xác nhận"}
        </button>

        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/")}
        >
          ⬅ Quay về Home
        </button>
      </form>
    </div>
  );
}
