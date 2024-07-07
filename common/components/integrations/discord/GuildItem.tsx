import { GuildData, VoiceChannelData, getVoiceChannels, joinVoiceChannel } from "backend/integrations/discord/Client.ts";
import ChannelList from "common/components/integrations/discord/ChannelList.tsx";

export type ChannelClick = (channelId: string) => Promise<boolean>;

export default async function GuildItem({ guild }: { guild: GuildData }){
  const channels = await getVoiceChannels(guild.id) as 0 | VoiceChannelData[];

  const channelClick = async (channelId: string) => {
    return await joinVoiceChannel({
      guildId: guild.id,
      channelId: channelId
    });
  }

  const channelList = always(() => {
    if (!channels || channels.length === 0)
      return null;
    return <ChannelList channels={channels} channelClick={channelClick} />
  });
  
  return (
    <li>
        <span style={{fontWeight: "bold"}}>{guild.name}</span>
        {channelList}
    </li>
  );
}