import { getCommonGuilds, getDiscordClientId, pauseDiscord, resumeDiscord } from "backend/integrations/discord/Client.ts";
import GuildList from "common/components/integrations/discord/GuildList.tsx";
import Login from "common/components/integrations/discord/Login.tsx";
import { getAndRemoveNextVideoFromSession, getUser } from "backend/sessions.ts";

export default async function Discord({ code }: Readonly<{ code: string }>) {
  const user = await getUser();
  const clientId = await getDiscordClientId();

  const guildList = always(() => {
    if (user.discord.isLoggedIn && user.discord.guilds) {
      return <GuildList guilds={user.discord.guilds} />;
    }
    return <div>Loading...</div>;
  });

  const data = always(() => {
    if (user.discord.isLoggedIn) {
      getCommonGuilds();
      return guildList;
    }
    return <Login clientId={clientId} />;
  });
  
  return (
    <div class="discord flex flex-row  gap-x-4 aspect-video w-full">
      <div class="flex-1 overflow-y-auto rounded-xl flex items-center justify-center controls">
        {/* discord controls */}
        {always(() => <button class={{playPause: true, paused: user.discord.playing, active: user.discord.active}} onclick={async () => {
              if (user.discord.active) {
                if (user.discord.playing) {
                  await pauseDiscord();
                  user.discord.playing = false;
                } else {
                  await resumeDiscord();
                  user.discord.playing = true;
                }
              } else {
                getAndRemoveNextVideoFromSession(code);
              }
            }}></button>
          )
        }
      </div>
      <div class="min-w-[25%] flex flex-col gap-y-4">
        <div class="flex-1 bg-white dark:bg-white/5 border border-black dark:border-white/10 overflow-y-auto rounded-xl">
          {data}
        </div>
        <div class="flex items-center justify-center">
          <a class="discord" target="_blank" href={`https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=3146752&redirect_uri=${encodeURIComponent(new URL(window.location.href).origin)}%2Fintegration%2Fdiscord%2Fauth&integration_type=0&scope=bot`}>Add the Bot to your Server</a>
        </div>
      </div>
    </div>
  )
}