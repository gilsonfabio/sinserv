import NextAuth from "next-auth";
void NextAuth;

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      cartao: number;
      apiToken: string;
      refreshToken: string;
    };
  }

  interface User {
    id: number;
    name: string;
    email: string;
    cartao: number;
    apiToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    cartao: number;
    apiToken: string;
    refreshToken: string;
  }
}

