import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {

    /* Credentials will fail without this, need to enable JSON web tokens. */
    session: {
        jwt: true,
    },

    providers: [
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),

        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const user = {username: credentials.username, password: credentials.password}

                if (user) {
                    return Promise.resolve(user)
                } else {
                    return Promise.resolve(null)
                }

            }
        })

    ],

    database: process.env.DATABASE_URL
}

export default (req, res) => NextAuth(req, res, options)