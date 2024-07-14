import { GuildData } from "backend/integrations/discord/Client.ts";
import { ObjectRef, datexClassType } from "datex-core-legacy/datex_all.ts";

export const Discord = struct("Discord",
  class Discord {
    @property isLoggedIn: boolean = false;
    @property bearer?: string;
    @property guilds?: GuildData[];
    @property playing: boolean = false;
    @property active: boolean = false;

    @property setBearer = (bearer: string) => {
      this.bearer = bearer;
    }

    construct() {
      console.log("Created Discord Object");
    }
  }
);

export const UserData = struct("UserData",
  class UserData {
    @property userId: string = crypto.randomUUID();
    @property discord!: datexClassType<ObjectRef<typeof Discord>>;

    construct() {
      console.log("Created UserData Object");
      this.discord = new Discord();
    }
  }
);