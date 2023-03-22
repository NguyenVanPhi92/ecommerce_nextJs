import User from '@/models/User'
import db from '@/utils/db'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from './lib/mongodb'

db.connectDb() // connect database
export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        // OAuth authentication providers...
        // Đang nhập bằng username and password
        CredentialsProvider({
            // name: 'Credentials',
            // credentials: {
            //     username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
            //     password: { label: 'Password', type: 'password' }
            // },
            async authorize(credentials, req) {
                const email = credentials.email
                const password = credentials.password
                const user = await User.findOne({ email })

                if (user) {
                    return SignInUser({ password, user })
                } else {
                    throw new Error('This email dose not exist.')
                }
            }
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async session({ session, token }) {
            let user = await User.findById(token.sub)
            session.user.id = token.sub || user._id.toString()
            session.user.role = user.role || 'user'
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.JWT_SECRECT
})

// server side check password from client
const SignInUser = async ({ password, user }) => {
    if (!user.password) {
        throw new Error('Please enter your password.')
    }

    const testPassword = await bcrypt.compare(password, user.password)
    if (!testPassword) {
        throw new Error('Email or password sai!')
    }
    // if (!user.emailVeryfied) {
    //     throw new Error('Tài khoản chưa được xác thực')
    // }
    return user
}
