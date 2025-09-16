import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/reset-password", { token, newPassword });
      alert(res.data.msg);
    } catch (err) {
      alert("Reset thất bại");
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Reset Password</h2>
      <input type="text" placeholder="Token" onChange={(e) => setToken(e.target.value)} />
      <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
      <button type="submit">Reset</button>
    </form>
  );
}
