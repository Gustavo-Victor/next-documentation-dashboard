import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@/app/lib/definitions"; 
import { z } from "zod"; 
import { sql } from "@vercel/postgres"; 
import bcrypt from "bcrypt"; 

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`; 
        return user.rows[0]; 
    } catch (error) {
        console.error("Failed to fetch user: ", error);
        throw new Error("Failed to fetch user."); 
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                // validate login data type
                const LoginSchema = z.object({
                    email: z.string().email(),
                    password: z.string().min(6)
                });                 
                const parsedCredentials = LoginSchema.safeParse(credentials);             
                
                //check information
                if(parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email); 
                    
                    //not found
                    if(!user) return null; 

                    //compare passwords
                    const passwordsMath = await bcrypt.compare(password, user.password); 

                    // user authenticated
                    if(passwordsMath) {
                        return user; 
                    }
                }
                
                //invalid login
                console.log("Invalid credentials"); 
                return null; 
            }
    })]
 }); 



