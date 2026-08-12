"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signup = async () => {
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created! Check your email to confirm your account.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-bold">Create Account</h1>

        <p className="mt-2 text-white/50">
          Create your profile account
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
          onClick={signup}
          className="mt-6 w-full rounded-xl bg-purple-500 p-4 font-semibold hover:bg-purple-400"
        >
          Sign Up
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