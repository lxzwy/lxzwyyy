
"use client";

export default function ShareButton() {
  const shareProfile = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Profile link copied!");
  };

  return (
    <button
      onClick={shareProfile}
      className="mt-6 w-full rounded-xl bg-purple-500 p-4 font-semibold hover:bg-purple-400"
    >
      🔗 Share Profile
    </button>
  );
}

