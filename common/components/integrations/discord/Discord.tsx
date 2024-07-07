import { getCommonGuilds, getDiscordClientId } from "backend/integrations/discord/Client.ts";
import GuildList from "common/components/integrations/discord/GuildList.tsx";
import Login from "common/components/integrations/discord/Login.tsx";

export default async function Discord() {
  const data = await getCommonGuilds();
  const clientId = await getDiscordClientId();

  const guildList = always(() => {
    if (data.status > 0) {
      console.error(data.status, data.errors);
      return <Login clientId={clientId} />;
    }
    return <GuildList guilds={data.guilds} />
  });
  
  return (
    <div>
      {guildList}
      <a target="_blank" href={`https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=3146752&redirect_uri=${encodeURIComponent(new URL(window.location.href).origin)}%2Fintegration%2Fdiscord%2Fauth&integration_type=0&scope=bot`}>Add Bot to Server</a>
    </div>
  )
}