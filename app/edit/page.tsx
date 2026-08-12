"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function EditProfile() {
  const [name, setName] = useState("Lxzwy");
  const [username, setUsername] = useState("lxzwydev");
  const [bio, setBio] = useState("test run");

  const [github, setGithub] = useState("");
  const [discord, setDiscord] = useState("");
  const [tiktok, setTiktok] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const saveProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You need to be logged in!");
      return;
    }

    let avatarUrl = "";

    if (avatarFile) {
      const fileExtension = avatarFile.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, avatarFile, {
          upsert: true,
        });

      if (uploadError) {
        alert("PFP upload error: " + uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      avatarUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: user.id,
          username,
          display_name: name,
          bio,
          links: [
            { name: "GitHub", url: github },
            { name: "Discord", url: discord },
            { name: "TikTok", url: tiktok },
          ],
          ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      alert("Error saving profile: " + error.message);
      return;
    }

    alert("Profile saved!");
  };

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-xl">

        <h1 className="text-3xl font-bold">
          Edit Profile
        </h1>

        <p className="mt-2 text-white/50">
          Customize your profile
        </p>

        <div className="mt-8">
          <label className="text-sm text-white/60">
            Display Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-white/60">
            Username
          </label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-white/60">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-white/60">
            GitHub
          </label>

          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/yourname"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-white/60">
            Discord
          </label>

          <input
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            placeholder="https://discord.com/..."
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-white/60">
            TikTok
          </label>

          <input
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            placeholder="https://tiktok.com/@username"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-white/60">
            Profile Picture
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setAvatarFile(e.target.files?.[0] || null);
            }}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-purple-400/20 bg-white/5 p-6">
          <p className="text-sm text-white/40">
            Preview
          </p>

          <h2 className="mt-3 text-2xl font-bold text-purple-300">
            {name}
          </h2>

          <p className="text-sm text-white/40">
            @{username}
          </p>

          <p className="mt-4 text-white/70">
            {bio}
          </p>
        </div>

        <button
          onClick={saveProfile}
          className="mt-6 w-full rounded-xl bg-purple-500 p-4 font-semibold transition hover:bg-purple-400"
        >
          Save Profile
        </button>

      </div>
    </main>
  );
}

