import { PrismaClient } from "@prisma/client"
import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  neonPool: Pool | undefined
}

const neonPool = globalForPrisma.neonPool ?? new Pool({ connectionString: process.env.DATABASE_URL })
if (process.env.NODE_ENV !== "production") globalForPrisma.neonPool = neonPool

const adapter = new PrismaNeon(neonPool)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
