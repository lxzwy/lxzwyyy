
import { supabase } from "../../lib/supabase";
import ShareButton from "./ShareButton";

export default async function PublicProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, display_name, bio, avatar_url, links")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p>Database error: {error.message}</p>
      </main>
    );
  }


  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">
          Profile not found
        </h1>
      </main>
    );
  }

await supabase.rpc("increment_profile_views", {
  profile_username: username,
});

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-purple-400/20 bg-black/40 p-8 text-center backdrop-blur-xl">

        <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-2 border-white/20">
          <img
            src={profile.avatar_url || "/profile/svcode.jpg"}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold text-purple-300">
          {profile.display_name}
        </h1>

        <p className="mt-1 text-sm text-white/40">
          @{profile.username}
        </p>

        <p className="mx-auto mt-5 max-w-md text-white/70">
          {profile.bio}
        </p>

        <div className="mt-6 space-y-3">
          {profile.links?.map(
            (link: { name: string; url: string }) =>
              link.url && (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/10 bg-white/10 p-4 transition hover:bg-purple-500/10"
                >
                  {link.name}
                </a>
              )
          )}
        </div>

        <ShareButton />

      </div>
    </main>
  );
}

