import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter both email and password.");
      setIsError(true);
      return;
    }

    const endpoint = isSignUp 
      ? "http://localhost:5000/api/signup" 
      : "http://localhost:5000/api/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        setIsError(true);
      } else {
        setMessage(data.message);
        setIsError(false);
      }
    } catch (err) {
      setMessage("Failed to connect to the server.");
      setIsError(true);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f7f7f7" }}>
      {/* Reduced width to 480px for a smaller, compact size */}
      <div style={{ background: "#fff", padding: "36px 40px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", width: "100%", maxWidth: "480px", textAlign: "center" }}>
        
        <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>{isSignUp ? "Sign Up" : "Log In"}</h2>
        
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
          {isSignUp ? "Already a member? " : "Need an account? "}
          <span 
            onClick={() => { setIsSignUp(!isSignUp); setMessage(""); }} 
            style={{ color: "#4a90e2", cursor: "pointer" }}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "left", marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </div>

          <button 
            type="submit" 
            style={{ width: "100%", padding: "12px", background: "#6ab0f3", color: "white", border: "none", borderRadius: "4px", fontSize: "15px", cursor: "pointer" }}
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "16px", fontSize: "14px", color: isError ? "#d9534f" : "#333" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}