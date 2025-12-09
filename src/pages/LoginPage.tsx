import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Email sau parolă incorectă.");
    }
  };

  return (
    <div className="pt-40 flex justify-center text-white px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 p-6 rounded-2xl max-w-md w-full shadow-xl backdrop-blur"
      >
        <h1 className="text-3xl font-bold mb-4">Autentificare</h1>

        {error && <p className="text-red-400">{error}</p>}

        <input
          className="w-full p-3 mt-4 rounded bg-slate-800"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mt-4 rounded bg-slate-800"
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full mt-6 p-3 bg-yellow-500 text-black rounded font-bold"
          type="submit"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-300">
          Nu ai cont?{" "}
          <Link to="/register" className="text-yellow-400">
            Creează cont
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
