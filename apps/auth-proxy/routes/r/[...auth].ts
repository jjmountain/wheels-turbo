import { Auth } from "@auth/core";
import Discord from "@auth/core/providers/discord";
import GoogleProvider from "@auth/core/providers/google";

import { eventHandler, toWebRequest } from "h3";

export default eventHandler(async (event) => {

  console.log("Incoming request headers:", event.headers);
  console.log("Incoming request cookies:", event.headers.get('cookie'));

    return Auth(toWebRequest(event), {
      basePath: "/r",
      secret: process.env.AUTH_SECRET,
      trustHost: !!process.env.VERCEL,
      redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
      providers: [
        Discord({
          clientId: process.env.AUTH_DISCORD_ID,
          clientSecret: process.env.AUTH_DISCORD_SECRET,
        }),
        GoogleProvider({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
      ],  
    })  
})    

