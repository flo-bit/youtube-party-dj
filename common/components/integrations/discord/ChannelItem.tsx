import { VoiceChannelData } from "backend/integrations/discord/Client.ts";
import { Pointer } from "datex-core-legacy/datex_all.ts";

export default function ChannelItem({ channel, botInChannel, channelClick }: { channel: VoiceChannelData, botInChannel: Pointer<0 | 1 | 2> & (0 | 1 | 2), channelClick: (channelId: string) => Promise<void> }) {
  return (
    <li class="item">
      <button class={{hasBot: always(() => botInChannel.val === 1), hasForeignBot: always(() => botInChannel.val === 2)}} onclick={() => channelClick(channel.id)}>{channel.name}</button>
    </li>
  );
}