import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        admin(),
        nextCookies(),
        organization()
    ],
});
