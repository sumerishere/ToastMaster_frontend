import "../Login-form/Login.css";
import { useState } from "react";

import { Link } from "react-router-dom";

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle login logic here
      console.log('Login attempted with:', { username, password });
    };
  
    return (
      <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">Welcome Back</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="username" className="login-label">Username</label>
              <input
                type="text"
                id="username"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="login-input-group">
              <label htmlFor="password" className="login-label">Password</label>
              <input
                type="password"
                id="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Log In</button>
          </form>
          <div className="login-links">
            <a href="#" className="login-forgot-password">Forgot Password?</a>
            <Link to="/RegisterForm" className="login-signup">Sign Up</Link>
          </div>
        </div>

    </div>
  );
}

export default LoginForm;