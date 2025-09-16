const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const crypto = require("crypto");

// Đăng ký
exports.signup = (req, res) => {
  const { fullname, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.query("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
    [fullname, email, hash],
    (err) => {
      if (err) return res.status(400).json({ msg: "Email đã tồn tại" });
      res.json({ msg: "Đăng ký thành công" });
    });
};

// Đăng nhập
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ msg: "Sai email" });

    const user = results[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Sai mật khẩu" });

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
    res.json({ msg: "Đăng nhập thành công", token });
  });
};

// Gửi yêu cầu reset password
exports.resetRequest = (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString("hex");
  const expiry = new Date(Date.now() + 3600000); // 1h

  db.query("UPDATE users SET resetToken=?, resetTokenExpiry=? WHERE email=?",
    [token, expiry, email],
    (err, results) => {
      if (err || results.affectedRows === 0) return res.status(400).json({ msg: "Email không tồn tại" });

      // Ở đây bạn có thể dùng nodemailer để gửi email, demo mình chỉ trả về token
      res.json({ msg: "Reset token đã tạo", token });
    });
};

// Đặt lại mật khẩu
exports.resetPassword = (req, res) => {
  const { token, newPassword } = req.body;
  const hash = bcrypt.hashSync(newPassword, 10);

  db.query("UPDATE users SET password=?, resetToken=NULL, resetTokenExpiry=NULL WHERE resetToken=? AND resetTokenExpiry > NOW()",
    [hash, token],
    (err, results) => {
      if (err || results.affectedRows === 0) return res.status(400).json({ msg: "Token không hợp lệ hoặc đã hết hạn" });
      res.json({ msg: "Đổi mật khẩu thành công" });
    });
};






