import { Client as DClient, ClientOptions, GatewayIntentBits, Events } from "npm:discord.js";
import { Shoukaku, Connectors, Player, Track } from "npm:shoukaku";
import { getUser } from "backend/sessions.ts";
import { Context } from "uix/routing/context.ts";
import config from "backend/integrations/discord/config.ts";

class Client extends DClient {
    shoukaku!: Shoukaku;
}

export let client: Client;

export const init = () => {
    const nodes = [
        {
            name: "default",
            url: `${config.LAVA_HOST}:${config.LAVA_PORT}`,
            auth: config.LAVA_PASS
        }
    ];

    const options: ClientOptions = {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
        ]
    };

    client = new Client(options);
    const shoukaku = new Shoukaku(new Connectors.DiscordJS(client), nodes);

    // Always handle "error" events or your program may crash due to uncaught error
    shoukaku.on("error", (_, error) => console.error(error));
    client.login(config.BOT_TOKEN);

    client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    // If you want shoukaku to be available on client, then bind it to it, here is one example of it
    client.shoukaku = shoukaku;
}

export const auth = async (ctx: Context, code: string) => {
    const endpoint = ctx.endpoint.main.toString();

    const url = new URL(ctx.request.url);
    const result = await fetch("https://discord.com/api/oauth2/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: config.CLIENT_ID,
                client_secret: config.CLIENT_SECRET,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: url.origin + "/integration/discord/auth",
                scope: "identify"
            })
        }
    );
    if (!result.ok) {
        return false;
    }
    const data = await result.json();
    if (data.access_token) {
        const user = getUser(endpoint);
        if (!user.discord) {
            user.discord = {
                bearer: data.access_token
            }
        } else {
            user.discord.bearer = data.access_token;
        }
        return true;
    }
    return false;
}

export interface GuildData {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
    approximate_member_count: number;
    approximate_presence_count: number;
}

const getGuilds = async (auth: string) => {
    const result = await fetch("https://discord.com/api/v10/users/@me/guilds", {
        headers: {
            "Authorization": auth
        }
    });
    if (!result.ok) {
        return 0;
    }
    return await result.json() as GuildData[];
}

const status: Record<string, number> = {
    "OK": 0,
    "NO_DISCORD_TOKEN": 1,
    "FAILED_TO_GET_GUILDS": 2,
}

const botGuildsS: {
    guilds: GuildData[],
    lastUpdate: number
} = {
    guilds: [],
    lastUpdate: 0
}

const userGuildsS: Record<string, {guilds: GuildData[], lastUpdate: number}> = {}

// deno-lint-ignore no-explicit-any
export const getCommonGuilds = async (): Promise<{status: number, guilds: GuildData[], errors?: any}> => {
    const user = getUser();
    if (!user.discord || !user.discord.bearer) {
        return {
            status: status.NO_DISCORD_TOKEN,
            guilds: []
        };
    }
    
    if (Date.now() - botGuildsS.lastUpdate > 60000) {
        const tBotGuilds = await getGuilds(`Bot ${config.BOT_TOKEN}`);

        if (!tBotGuilds) {
            return {
                status: status.FAILED_TO_GET_GUILDS,
                guilds: [],
                errors: tBotGuilds
            };
        }
        
        botGuildsS.guilds = tBotGuilds;
        botGuildsS.lastUpdate = Date.now();
    }

    if (!(user.userId in userGuildsS) || Date.now() - userGuildsS[user.userId].lastUpdate > 60000) {
        const tUserGuilds = await getGuilds(`Bearer ${user.discord.bearer}`);
        if (!tUserGuilds) {
            return {
                status: status.FAILED_TO_GET_GUILDS,
                guilds: [],
                errors: tUserGuilds
            };
        }
        
        userGuildsS[user.userId] = {
            guilds: tUserGuilds,
            lastUpdate: Date.now()
        }
    }

    const commonGuilds = userGuildsS[user.userId].guilds.filter(guild => botGuildsS.guilds.find(userGuild => userGuild.id === guild.id));
    user.discord.guilds = commonGuilds;
    return {
        status: status.OK,
        guilds: commonGuilds
    };
}

interface ChannelData {
    flags: number;
    id: string;
    name: string;
    guild_id: string;
    last_message_id: string;
    nsfw: boolean;
    parent_id: string;
    permission_overwrites: string[];
    position: number;
    rate_limit_per_user: number;
    type: number;
}

export interface VoiceChannelData extends ChannelData {
    bitrate: number;
    user_limit: number;
    rtc_region: string;
}

interface TextChannelData extends ChannelData {
    topic: string;
}

const getChannelsOfGuild = async (guildId: string) => {
    const user = getUser();
    if (!user.discord || !user.discord.bearer) {
        throw status.NO_DISCORD_TOKEN;
    }
    if (!user.discord.guilds || user.discord.guilds.find(guild => guild.id === guildId) === undefined) {
        return 0;
    }
    const result = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
        headers: {
            "Authorization": `Bot ${config.BOT_TOKEN}`
        }
    });
    if (!result.ok) {
        return 0;
    }
    return await result.json() as (VoiceChannelData | TextChannelData)[];
}

export const getVoiceChannels = async (guildId: string) => {
    const channels = await getChannelsOfGuild(guildId);
    if (!channels) {
        return 0;
    }
    return channels.filter((channel: (VoiceChannelData | TextChannelData)) => channel.type === 2) as VoiceChannelData[];
}

type userId = string;
type guildId = string;
export const playerInstances: Record<userId, Record<guildId, Player>> = {};

export const joinVoiceChannel = async (data: { guildId: string, channelId: string }) => {
    const user = getUser();
    for (const userId in playerInstances) {
        if (userId === user.userId) continue;
        for (const guildId in playerInstances[userId]) {
            if (guildId === data.guildId) {
                console.warn("This guild already has a player instance.");
                return false;
            }
        }
    }
    if (!user.discord || !user.discord.bearer) {
        throw status.NO_DISCORD_TOKEN;
    }
    if (!(user.userId in playerInstances)) {
        playerInstances[user.userId] = {};
    }
    const userPlayers = playerInstances[user.userId];
    if (data.guildId in userPlayers) {
        await client.shoukaku.leaveVoiceChannel(data.guildId);
        delete userPlayers[data.guildId];
    }
    const player = userPlayers[data.guildId] = (await client.shoukaku.joinVoiceChannel({
        guildId: data.guildId,
        channelId: data.channelId,
        shardId: 0
    }));
    return !!player;
}

export const play = async (players: Record<guildId, Player>, data: { track: string }, queue: () => void = () => {}) => {
    let track;

    for (const guildId in players) {
        const player = players[guildId];
        if (!track) {
            const result = await player.node.rest.resolve(data.track);
            if (!result || result.loadType == 'empty') return;
            track = result.data as Track;
        }
        
        // play the searched track
        await player.playTrack({ track: track.encoded });
        // wait for track to end
        player.once('end', () => {
            queue();
        });
    }
}

export const playDiscord = (data: { track: string }) => {
    const user = getUser();
    const players = playerInstances[user.userId];
    play(players, data);
}

export const pauseDiscord = async () => {
    const user = getUser();
    const players = playerInstances[user.userId];
    for (const guildId in players) {
        await players[guildId].setPaused(true);
    }
}

export const resumeDiscord = async (data?: { track: string }) => {
    const user = getUser();
    const players = playerInstances[user.userId];
    for (const guildId in players) {
        if (players[guildId].paused) {
            await players[guildId].setPaused(false);
        } else if (data) {
            const filteredPlayers: Record<guildId, Player> = {};
            for (const guildId in players) {
                if (!players[guildId].paused) {
                    filteredPlayers[guildId] = players[guildId];
                }
            }
            await play(filteredPlayers, { track: data.track });
        }
    }
}

export const getDiscordClientId = () => {
    return $$(config.CLIENT_ID);
}