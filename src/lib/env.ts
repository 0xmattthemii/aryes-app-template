import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Payload CMS
  PAYLOAD_SECRET: z.string().min(32),

  // Better Auth
  BETTER_AUTH_SECRET: z.string().min(32),
  
  // App Defaults
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_SERVER_URL: z.string().url().default('http://localhost:3000'),
});

// 1. Validate the environment variables
const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. Check your .env.local file.');
}

// 2. Export the validated data
export const env = result.data;

// 3. Global Type Augmentation
// This allows you to use process.env.DATABASE_URL with full autocomplete everywhere
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}