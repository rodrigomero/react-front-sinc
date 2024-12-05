"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../styles/login.css";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    let data = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    let login = await data.json();

    if (login) {
      alert("Login bem-sucedido!");
      localStorage.setItem("userId", login.id);
      localStorage.setItem("isAdmin", login.isAdmin ? "true" : "false");
      router.push("/products");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <main>
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

          <div className="container-btn-login">
            <button
              type="button"
              className="back-button"
              onClick={() => {
                router.push("/register");
              }}
            >
              Cadastre-se
            </button>

            <button type="submit" className="login-button">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
