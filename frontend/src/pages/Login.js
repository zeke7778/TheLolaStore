import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser({ email, password });
      // backend should return user + token
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data);
        if (data.isAdmin) navigate("/admin");
        else navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={submit}>
        <label>Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;