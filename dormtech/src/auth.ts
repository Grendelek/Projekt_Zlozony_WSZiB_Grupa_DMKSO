import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Role } from "@prisma/client";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Konto DormTech",
      credentials: {
        email: { label: "Adres e-mail", type: "email" },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string"
          ? credentials.email.trim().toLowerCase() : "";
        const password = typeof credentials?.password === "string"
          ? credentials.password : "";

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await compare(password, user.passwordHash))) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
  if (session.user) {
    if (
      typeof token.id !== "string" ||
      (token.role !== Role.ADMIN && token.role !== Role.RESIDENT)
    ) {
      throw new Error("Nieprawidłowe dane sesji.");
    }

    session.user.id = token.id;
    session.user.role = token.role;
  }

  return session;
},
  },
});
