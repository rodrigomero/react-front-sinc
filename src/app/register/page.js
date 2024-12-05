"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../styles/login.css";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    let data = await fetch(`${baseUrl}/users/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        isAdmin: false,
      }),
    });
    let login = data.ok;

    if (login) {
      alert("Registro bem-sucedido!");
      router.push("/login");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <main>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="login-title">Cadastre-se</h1>

          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
            required
          />

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
            required
          />

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="login-input"
            required
          />

          {error && <p className="login-error">{error}</p>}
          <div className="container-btn-login">
            <button
              type="button"
              className="back-button"
              onClick={() => {
                router.push("/");
              }}
            >
              Voltar
            </button>

            <button type="submit" className="login-button">
              Criar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
