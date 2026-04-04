import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: 'postgresql://neondb_owner:npg_7nA4lgchIQxd@ep-proud-dawn-amwmhnnt-pooler.c-5.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require',
  },
})