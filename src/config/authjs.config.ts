import GoogleProvider from "@auth/core/providers/google";
import GithubProvider from "@auth/core/providers/github";
import { AuthConfig } from "@auth/core";

export const getAuthConfig = (): AuthConfig => ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      clientId: process.env.GITHUB_CLIENT_ID!,
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  trustHost: true,

  // Uncomment for debugging
  // logger: {
  //   warn: console.warn,
  //   error: console.error,
  //   debug: console.debug,
  // },
});
