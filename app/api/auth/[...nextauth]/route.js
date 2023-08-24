import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Sign in",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "hello@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// Handle auth

				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					return null;
				}
				console.log("User name", user.firstName);
				return {
					id: user.id + "",
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					randomKey: "Hey cool",
					role: user.role,
				};
			},
		}),
	],

	callbacks: {
		session: ({ session, token }) => {
			// console.log("Session Callback", { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					randomKey: token.randomKey,
					role: token.role,
					firstName: token.firstName,
				},
			};
		},
		jwt: ({ token, user }) => {
			// console.log("JWT Callback", { token, user });
			if (user) {
				const u = user;
				return {
					...token,
					id: u.id,
					randomKey: u.randomKey,
					role: u.role,
					firstName: u.firstName,
				};
			}
			return token;
		},
	},
	pages: {
		signIn: "/signin",
		// signOut: "/auth/signout",
		// error: "/auth/error", // Error code passed in query string as ?error=
		// verifyRequest: "/auth/verify-request", // (used for check email message)
		// newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
