import { Adapter } from 'next-auth/adapters'

import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    // async createUser() {},
    async getUser(id) {
      const user = await prisma.user.findFirstOrThrow({
        where: { id },
      })

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        avatar_url: user.avatar_url!,
        username: user.username,
        emailVerified: null,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findFirstOrThrow({
        where: { email },
      })

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        avatar_url: user.avatar_url!,
        username: user.username,
        emailVerified: null,
      }
    },

    async getUserByAccount() {},
    // async linkAccount() {},
    // async createSession() {},
    // async getSessionAndUser() {},
    // async updateSession() {},
    // async deleteSession() {},
    // async updateUser() {},
  }
}
