import { useState } from "react";
import axios from "axios";

export default function ResetRequest() {
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
    <form onSubmit={handleRequest}>
      <h2>Reset Password Request</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send Request</button>
    </form>
  );
}
