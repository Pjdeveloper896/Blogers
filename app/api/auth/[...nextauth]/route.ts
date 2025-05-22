import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

// For email sending, use a dummy transport (replace with real in prod)
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Your SMTP server
  port: 587,
  auth: {
    user: 'username',
    pass: 'password',
  },
});

export const authOptions = {
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.example.com',
        port: 587,
        auth: {
          user: 'username',
          pass: 'password',
        },
      },
      from: 'noreply@example.com',
    }),
  ],
  pages: {
    signIn: '/auth/signin', // your custom sign-in page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
