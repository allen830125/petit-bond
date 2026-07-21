import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('請輸入信箱和密碼');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('信箱或密碼錯誤');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('信箱或密碼錯誤');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    // authOptions must stay structurally untyped (no NextAuthOptions annotation) so that
    // getServerSession(authOptions) can infer the augmented Session type across the app;
    // next-auth v4's own CallbacksOptions typings aren't consistent enough to type these
    // params without breaking that inference, hence the explicit any here.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
