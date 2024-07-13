import { getCommonGuilds, getDiscordClientId } from "backend/integrations/discord/Client.ts";
import GuildList from "common/components/integrations/discord/GuildList.tsx";
import Login from "common/components/integrations/discord/Login.tsx";
import { getUser } from "backend/sessions.ts";

export default async function Discord() {
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
    <div class="absolute discord">
      {data}
      <a target="_blank" href={`https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=3146752&redirect_uri=${encodeURIComponent(new URL(window.location.href).origin)}%2Fintegration%2Fdiscord%2Fauth&integration_type=0&scope=bot`}>Add the Bot to your Server</a>
    </div>
  )
}