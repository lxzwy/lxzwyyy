"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Logged in successfully!");

    window.location.href = "/edit";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-white/50">
          Log into your account
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
        />

        <button
          onClick={login}
          className="mt-6 w-full rounded-xl bg-purple-500 p-4 font-semibold transition hover:bg-purple-400"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-sm text-white/60">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}