import { Client as DClient, ClientOptions, GatewayIntentBits, Events } from "npm:discord.js";
import { Shoukaku, Connectors, Player, Track } from "npm:shoukaku";
import { getUser, sessions } from "backend/sessions.ts";
import { ObjectRef, Pointer, datexClassType } from "datex-core-legacy/datex_all.ts";
import { UserData } from "common/components/integrations/discord/Definitions.ts";

// fallback config
let config = {
    BOT_TOKEN: "",
    CLIENT_ID: "",
    CLIENT_SECRET: "",
    LAVA_HOST: "",
    LAVA_PORT: 0,
    LAVA_PASS: ""
}

// try to get config from the file
try {
    const tryGetConfig = await import("backend/integrations/discord/config.ts");
    config = tryGetConfig.default;
} catch (e) {
    console.error(e);
}

class Client extends DClient {
    shoukaku!: Shoukaku;
}

export let client: Client;

export const init = () => {
    // if any of the config values are empty, prevent the client from initializing
    if (config.BOT_TOKEN === "" || config.CLIENT_ID === "" || config.CLIENT_SECRET === "" || config.LAVA_HOST === "" || config.LAVA_PORT === 0 || config.LAVA_PASS === "") {
        return;
    };

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

    // where discord.active is true, clean up everything
    for (const session of Object.values(sessions)) {
        const user = session.host as datexClassType<ObjectRef<typeof UserData>>;
        if (user.discord.active) {
            user.discord.active = false;
            user.discord.playing = false;
            // @ts-ignore - what is this error?
            session.currentlyPlaying = null;
        }
    }
}

export const auth = async (code: string, origin: string) => {
    const endpoint = datex.meta.caller.main.toString();
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
                redirect_uri: origin + "/integration/discord/auth",
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
        user.discord.bearer = data.access_token;
        user.discord.isLoggedIn = true;
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
    botUser: Pointer<string> & string;
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

const voiceChannelsDB: {
    channels: Record<channelId, VoiceChannelData>,
    lastUpdate: number
} = {
    channels: {},
    lastUpdate: 0
};

export const getVoiceChannels = async (guildId: string) => {
    if (Date.now() - voiceChannelsDB.lastUpdate > 60000) {
        const channels = await getChannelsOfGuild(guildId);
        voiceChannelsDB.lastUpdate = Date.now();
        if (!channels) {
            console.log("Failed to get channels");
            return 0;
        }
        const voiceChannels = (channels.filter((channel: (VoiceChannelData | TextChannelData)) => channel.type === 2) as VoiceChannelData[]).reduce((acc, channel) => {
            acc[channel.id] = channel;
            return acc;
        }, {} as Record<channelId, VoiceChannelData>);

        for (const channelId in voiceChannels) {
            if (channelId in voiceChannelsDB) {
                voiceChannels[channelId] = voiceChannelsDB.channels[channelId];
            } else {
                voiceChannels[channelId].botUser = $$(playerInstances[voiceChannels[channelId].guild_id] ? playerInstances[voiceChannels[channelId].guild_id].userId : "");
                voiceChannelsDB.channels[channelId] = voiceChannels[channelId];
            }
        }

        return Object.values(voiceChannels);
    } else {
        // filter out channels that don't belong to the guild
        return Object.values(voiceChannelsDB.channels).filter(channel => channel.guild_id === guildId);
    }
}

type userId = string;
type guildId = string;
type channelId = string;

type PlayerInstance = {
    userId: userId,
    channelId: channelId,
    player?: Player
};
type PlayerInstances = Record<guildId, PlayerInstance>;

export const playerInstances: PlayerInstances = {};

type JoinVoiceChannelStatus = {
    status: 0 | 1 | 2 | 3,
    channelId: channelId
}
export const joinVoiceChannel = async (data: { guildId: string, channelId: string }): Promise<JoinVoiceChannelStatus> => {
    const user = getUser();

    // check if the guild already has a player instance
    if (data.guildId in playerInstances) {
        // check if the user has a player instance in the guild
        if (playerInstances[data.guildId].userId === user.userId) {
            // check if the user is trying to join the bot the same channel
            if (playerInstances[data.guildId].channelId === data.channelId) {
                // leave the channel
                await client.shoukaku.leaveVoiceChannel(data.guildId);

                // delete the player instance
                delete playerInstances[data.guildId];

                // set botUser to empty string
                voiceChannelsDB.channels[data.channelId].botUser.val = "";

                // return 2 to indicate that the bot has left the channel
                return {
                    status: 2,
                    channelId: data.channelId
                }
            }

            // leave the channel and join the new one
            await client.shoukaku.leaveVoiceChannel(data.guildId);
            const player = await client.shoukaku.joinVoiceChannel({
                guildId: data.guildId,
                channelId: data.channelId,
                shardId: 0
            });

            // check if the bot successfully joined the new channel
            if (!player) {
                // return 0 to indicate that the bot failed to join the new channel
                return {
                    status: 0,
                    channelId: playerInstances[data.guildId].channelId
                };
            }

            // set botUser of old channel to empty string
            voiceChannelsDB.channels[playerInstances[data.guildId].channelId].botUser.val = "";

            // update channel id because bot has joined a new channel
            playerInstances[data.guildId].channelId = data.channelId;

            // set botUser to the user's id
            voiceChannelsDB.channels[data.channelId].botUser.val = user.userId;

            // return 1 to indicate that the bot has joined the new channel
            return {
                status: 1,
                channelId: data.channelId
            };
        }

        // return 0 to indicate that the guild already has a player instance
        return {
            status: 3,
            channelId: playerInstances[data.guildId].channelId
        };
    }

    // check if the user has a discord token
    if (!user.discord.bearer) {
        throw status.NO_DISCORD_TOKEN;
    }

    // because the guild doesn't have a player instance, create one
    playerInstances[data.guildId] = {
        userId: user.userId,
        channelId: data.channelId
    };

    // join the voice channel and create a player instance
    const player = await client.shoukaku.joinVoiceChannel({
        guildId: data.guildId,
        channelId: data.channelId,
        shardId: 0
    });

    // check if the bot successfully joined the channel
    if (player) {
        // save the player instance
        playerInstances[data.guildId].player = player;
        // set botUser to the user's id
        voiceChannelsDB.channels[data.channelId].botUser.val = user.userId;
        // return 1 to indicate that the bot has joined the channel
        return {
            status: 1,
            channelId: data.channelId
        };
    }
    
    // return 0 to indicate that the bot failed to join the channel
    return {
        status: 0,
        channelId: ""
    };
}

export type PlayData = { track: string };

export const play = async (playerInstances: PlayerInstance[], data: PlayData, queue: () => void = () => {}) => {
    let track;

    for (const playerInstance of playerInstances) {
        const player = playerInstance.player;
        if (!player) {
            continue;
        }

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

export const getUserPlayerInstances = (user?: string) => {
    const userId = user ? user : getUser().userId;
    return Object.values(playerInstances).filter(player => player.userId === userId);
}

export const playDiscord = (data: PlayData) => {
    play(getUserPlayerInstances(), data);
}

export const pauseDiscord = async () => {
    for (const playerInstance of getUserPlayerInstances()) {
        await playerInstance.player?.setPaused(true);
    }
}

export const resumeDiscord = async (data?: PlayData) => {
    for (const playerInstance of getUserPlayerInstances()) {
        if (!playerInstance.player) continue;
        if (playerInstance.player.paused) {
            await playerInstance.player.setPaused(false);
        }
    }
}

export const getDiscordClientId = () => {
    return $$(config.CLIENT_ID);
}