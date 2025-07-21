import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from './config';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        alert("Login successful!");
        navigate("/admin/dashboard"); // Redirect to dashboard or home page
      } else {
        alert(`Login failed: ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-blue-800 text-lg font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 shadow-sm"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-blue-800 text-lg font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 shadow-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 font-bold text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 