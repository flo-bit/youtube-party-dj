import { VoiceChannelData } from "backend/integrations/discord/Client.ts";
import ChannelItem from "common/components/integrations/discord/ChannelItem.tsx";
import { ChannelClick } from "common/components/integrations/discord/GuildItem.tsx";
import { Pointer } from "datex-core-legacy/datex_all.ts";
import { getUser } from "backend/sessions.ts";

const user = await getUser();

export default function ChannelList({ channels, channelClick }: { channels: VoiceChannelData[], channelClick: ChannelClick }) {
    const hasBot: Record<string, Pointer<0 | 1 | 2> & (0 | 1 | 2)> = {};

    const clickHandler = async (channelId: string) => {
        const result = await channelClick(channelId);

        if (result.status === 1) {
            for (const channelIdKey in hasBot) {
                if (channelIdKey === channelId)
                    hasBot[channelIdKey].val = 1;
                else
                    hasBot[channelIdKey].val = 0;
            }
            console.log(`Joined channel ${channelId}`);

            // return early to prevent resetting bot labels on all channels
            return;
        } else if (result.status === 2) {
            console.log(`Left channel ${channelId}`);
        } else if (result.status === 3) {
            console.error(`Failed to join channel ${channelId} because the bot is already in a channel`);

            // return early to prevent resetting bot labels on all channels
            return;
        } else {
            console.error(`Something went wrong when trying to ${hasBot[channelId].val ? 'leave' : 'join'} the channel`);
        }

        // use for both status 2 and 0 to reset bot labels on all channels
        for (const channelIdKey in hasBot) {
            hasBot[channelIdKey].val = 0;
        }
    }

    return (
        <ul class="discord channel list">
            {channels.map((channel: VoiceChannelData) => {
                hasBot[channel.id] = always(() => {
                    console.log("changed to", channel.botUser);
                    return channel.botUser.val === "" ? 0 : channel.botUser.val === user.userId ? 1 : 2;
                });
                return <ChannelItem channel={channel} botInChannel={hasBot[channel.id]} channelClick={clickHandler} />
            })}
        </ul>
    );
}