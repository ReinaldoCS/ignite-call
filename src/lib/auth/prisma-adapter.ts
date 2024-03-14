import { NextApiRequest, NextApiResponse } from 'next'
import { Adapter } from 'next-auth/adapters'
import { destroyCookie, parseCookies } from 'nookies'

import { prisma } from '../prisma'

export function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse,
): Adapter {
  return {
    async createUser(user) {
      const { '@ignite-call:userId': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) {
        throw new Error('User ID not found in cookies.')
      }

      const prismaUser = await prisma.user.update({
        where: { id: userIdOnCookies },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      destroyCookie({ res }, '@ignite-call:userId', { path: '/' })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        username: prismaUser.username,
        emailVerified: null,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        return null
      }

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
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return null
      }

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
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

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
      const session = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!session) {
        return null
      }

      const { user } = session

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

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
