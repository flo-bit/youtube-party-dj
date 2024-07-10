import { Pointer } from "datex-core-legacy/runtime/pointers.ts";

export default function Login({ clientId }: { clientId: Pointer<string> & string }) {
  return (
    <div>
      <h1>Setup Discord Bot</h1>
      <a href={`https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(new URL(window.location.href).origin)}%2Fintegration%2Fdiscord%2Fauth&scope=identify+guilds`} target="_blank" onclick={globalThis.close}>Login</a>
    </div>
  )
}