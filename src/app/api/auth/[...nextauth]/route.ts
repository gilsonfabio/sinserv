import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import axios from "axios";

// Validação dos dados
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }),
});

// URL da API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backcaldascard.vercel.app/";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const result = loginSchema.safeParse(credentials);
          if (!result.success) return null;

          const response = await axios.post(`${API_URL}/signInSrv`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = response.data;

          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              cartao: user.cartao,
              apiToken: user.token,
              refreshToken: user.refreshToken,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login", 
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.cartao = Number(user.cartao)
        token.apiToken = user.apiToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.cartao = token.cartao;
        session.user.apiToken = token.apiToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
