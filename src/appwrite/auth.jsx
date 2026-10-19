import { Client, Account, ID } from 'appwrite';
import conf from './conf'

export class AuthService{
    client = new Client()
    account
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.account = new Account(this.client)
            console.log(import.meta.env.VITE_APPWRITE_URL);
console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    }

    async createAccount({email,password}){
        try {
            const userAcc = await this.account.create({
                userId:ID.unique(),
                email,
                password
            })
            if(userAcc) {
                await this.login({email,password})
                return userAcc
            }
        } catch (error) {
            console.log('appwrite::createAccount::error',error);
            throw error
            
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession({
                email,
                password
            })
        } catch (error) {
             console.log('appwrite::login::error',error);
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
           console.log('appwrite::getCurrentUser::error',error);
            throw error 
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('appwrite::logout::error',error);
            throw error
        }
    }
}

 const authService = new AuthService()

export default authService
