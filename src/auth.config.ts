import CredentialsProvider from "next-auth/providers/credentials"
import type { AuthOptions } from "next-auth"

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Simulação: substitua com lógica real (ex: consulta ao banco)
        if (
          credentials.email === "admin@email.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: 1,
            name: "Admin",
            email: credentials.email,
            cartao: 1234567890123456,
            apiToken: "fake-api-token",
            refreshToken: "fake-refresh-token",
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // user só existe no login
      if (user) {
        token.id = Number(user.id)
        token.cartao = user.cartao
        token.apiToken = user.apiToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number
        session.user.cartao = token.cartao as number
        session.user.apiToken = token.apiToken as string
        session.user.refreshToken = token.refreshToken as string
      }
      return session
    },
  },
}
