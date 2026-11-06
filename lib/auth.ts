import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const mongoUri = process.env.BETTER_AUTH_DB_URI ?? "mongodb://localhost:27017/hireloopdb"
const mongoDbName = process.env.MONGODB_DB_NAME ?? "hireloopdb"

const client = new MongoClient(mongoUri)
const db = client.db(mongoDbName)

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim()
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
   user: {
       additionalFields: {
          role: {
              type: ['seeker', 'recruiter', 'admin'],
              input: false
            } 
        }
    },
  socialProviders:
    googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {},
  database: mongodbAdapter(db, {
    client,
  }),
})
