import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginImg from "../../public/images/login-page-img.png"
import LoginIcon from "../assets/svg/LoginIcon";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.login, form.password);
    if (result.success) {
      if (result.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/branch");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-title">
            <button className="login-icon"><LoginIcon /></button>
            <h2 className="login-title-text">Bakery</h2>
        </div>
        <h1 className="login-subtitle">Welcome back!</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Login"
          value={form.login}
          onChange={(e) => setForm({ ...form, login: e.target.value })}
          className="login-log-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="login-pass-input"
        />
        <button className="login-btn">
          Kirish
        </button>
      </form>
    </div>
  );
}
