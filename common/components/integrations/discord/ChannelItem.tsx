import { VoiceChannelData } from "backend/integrations/discord/Client.ts";
import { ChannelClick } from "common/components/integrations/discord/GuildItem.tsx";

export default function ChannelItem({ channel, channelClick }: { channel: VoiceChannelData, channelClick: ChannelClick }) {
  const color = $$("black");

  const clickHandler = async () => {
    const result = await channelClick(channel.id);
    if (result)
      color.val = $$("green");
    else
      color.val = $$("red");
  }

  return (
    <li>
      <button style={{color: color}} onclick={clickHandler}>{channel.name}</button>
    </li>
  );
}