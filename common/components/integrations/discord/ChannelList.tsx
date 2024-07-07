import { VoiceChannelData } from "backend/integrations/discord/Client.ts";
import ChannelItem from "common/components/integrations/discord/ChannelItem.tsx";
import { ChannelClick } from "common/components/integrations/discord/GuildItem.tsx";

export default function ChannelList({ channels, channelClick }: { channels: VoiceChannelData[], channelClick: ChannelClick }) {
    return (
        <ul>
            {channels.map(channel => (
                <ChannelItem channel={channel} channelClick={channelClick} />
            ))}
        </ul>
    );
}