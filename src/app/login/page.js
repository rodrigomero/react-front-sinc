"use client";

import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
const apiBaseUrl = "http://localhost:8080"

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    let data = await fetch(apiBaseUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        JSON.stringify({ username: username, password: password })
    });
    let login = await data.json();

    if (login) {
      redirect("/dashboard");
      alert("Login bem-sucedido!");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-title">Login</h1>

        <label htmlFor="username" className="login-label">
          username:
        </label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu username"
          className="login-input"
          required
        />

        <label htmlFor="password" className="login-label">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className="login-input"
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}
