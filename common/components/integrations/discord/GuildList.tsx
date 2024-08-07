import { GuildData } from "backend/integrations/discord/Client.ts";
import GuildItem from "common/components/integrations/discord/GuildItem.tsx";

export default function GuildList({ guilds }: { guilds: GuildData[] }) {
    return (
        <div>
            <ul class="discord guild list">
                {guilds.map(guild => (
                    <GuildItem guild={guild} />
                ))}
            </ul>
        </div>
    );
}