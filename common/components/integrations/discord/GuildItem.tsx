import { GuildData, VoiceChannelData, getVoiceChannels, joinVoiceChannel } from "backend/integrations/discord/Client.ts";
import ChannelList from "common/components/integrations/discord/ChannelList.tsx";

export type ChannelClick = (channelId: string) => Promise<{
  status: 0 | 1 | 2 | 3;
  channelId: string;
}>;

export default async function GuildItem({ guild }: { guild: GuildData }){
  const channels = await getVoiceChannels(guild.id);

  const channelClick = async (channelId: string) => {
    return await joinVoiceChannel({
      guildId: guild.id,
      channelId: channelId
    });
  }

  const displayChannelList = $$(false);
  const channelListClick = () => {
    displayChannelList.val = !displayChannelList.val;
  }

  const channelList = always(() => {
    if (channels === 0) {
      return <div class="empty">Failed to get voice channels</div>;
    }
    if (channels.length === 0) {
      return <div class="empty">No voicechannels</div>;
    }
    return <ChannelList channels={channels} channelClick={channelClick} />
  });
  
  return (
    <li class={{discord: true, guild: true, item: true, open: displayChannelList}}>
        <div class="title" onclick={channelListClick}>
          <svg class="list indicator" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z" class=""></path></svg>
          <span class="name">{guild.name}</span>
        </div>
        {channelList}
    </li>
  );
}