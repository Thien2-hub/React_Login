import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post("http://localhost:3001/api/auth/signup", {
  fullname,
  email,
  password,
});

      alert(res.data.msg);
    } catch (err) {
      alert("Đăng ký thất bại");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setFullname(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
    </form>
  );
}
