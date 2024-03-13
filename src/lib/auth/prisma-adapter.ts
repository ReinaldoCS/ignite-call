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

    async getUserByAccount({ provider, providerAccountId }) {
      const { user } = await prisma.account.findFirstOrThrow({
        where: {
          provider_account_id: providerAccountId,
          provider,
        },
        include: {
          user: true,
        },
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

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        username: prismaUser.username,
        emailVerified: null,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          session_token: sessionToken,
          expires,
        },
      })

      return {
        sessionToken,
        userId,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const { user, ...session } = await prisma.session.findFirstOrThrow({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email!,
          avatar_url: user.avatar_url!,
          username: user.username,
          emailVerified: null,
        },
      }
    },

    async updateSession(session) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: session.sessionToken,
        },
        data: {
          expires: session.expires,
          session_token: session.sessionToken,
          user_id: session.userId,
        },
      })
      return {
        expires: prismaSession.expires,
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
      }
    },
  }
}
