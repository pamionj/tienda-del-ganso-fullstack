import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://neondb_owner:npg_83aeYTmuNChA@ep-weathered-block-aniji7dl.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require"
      }
    }
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
