import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Obtener connection string - intentar desde .env o prisma.config.ts
function getConnectionString(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }
  // Fallback al archivo prisma.config.ts
  throw new Error('DATABASE_URL no está configurada en las variables de entorno')
}

const connectionString = getConnectionString()

const adapter = new PrismaPg({ connectionString })

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : []
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
