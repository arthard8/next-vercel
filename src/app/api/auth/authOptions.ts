import { NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import {UserRole} from "@prisma/client";
import CredentialProvider from "next-auth/providers/credentials";
import {prisma} from "../../../../prisma/prisma-client";
import {compare, hashSync} from "bcrypt";

export const authOptions: NextAuthOptions = {


    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                return {

                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as UserRole,

                }

            }
        }),
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }
                const values = {
                    email: credentials.email,
                }


                const findUser = await prisma.user.findFirst({
                    where: values

                })

                if (!findUser) {
                    return null
                }
                const isPasswordValid = await compare(credentials.password, findUser.password)

                if (!isPasswordValid) {
                    return null
                }

                if (!findUser.verified) {
                    return null
                }

                return {
                    id: String(findUser.id),
                    name: findUser.fullName,
                    email: findUser.email,
                    role: findUser.role
                }
            }
        })

    ],

    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
    },

    callbacks: {

        async signIn({user, account}) {
            try {


                if (account?.provider === 'credentials') {
                    return true
                }

                if (!user.email) {
                    return false
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            {provider: account?.provider, providerId: account?.providerAccountId},
                            {email: user.email}
                        ]

                    }
                })

                if(findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId
                        }
                    })

                    return  true
                }


                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || 'User #' + user.id.toString(),
                        password: hashSync(user.id.toString(), 10), // TODO: переделать на нормальный генератор пароля без id
                        verified: new Date(),
                        provider: account?.provider,
                        providerId: account?.providerAccountId
                    }
                })

                return true

            } catch (e) {
                console.error("Error [SIGNIN]", e)
                return false
            }
        },


        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                //@ts-ignore
                token.role = user.role;
                //@ts-ignore
                token.fullName = user.fullName;
            }

            if(!token.email) {
                return  token
            }

            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })

            if (findUser) {

                token.id = String(findUser.id)
                token.email = findUser.email
                token.role = findUser.role
                token.fullName = findUser.fullName


            }

            return token
        },

        async session({session, token}) {



            if (session?.user) {
                //@ts-ignore
                session.user.id = token.id
                //@ts-ignore
                session.user.role = token.role

            }


            return session
        }
    }


}