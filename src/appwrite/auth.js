import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class Authservice{
client = new Client()
Account;
constructor(){
    this.client
      .setEndpoint(config.appwriteurl)
      .setProject(config.appwriteproductid)
      this.Account = new Account(this.client)
}
    async createAccount({email,name,password}){
        try{
            const userAccount = await this.Account.create({ userId: ID.unique(),email,password,name});
            if(userAccount){
              // method
              return this.login({email,password});
            }
            else{
              return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.Account.createEmailPasswordSession({email,password});
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
       try{
          return await this.Account.get();
       }
       catch(error){
         console.log("this.getCurrentUser",error);
       }
       return null;
    }

    async logout(){
        try{
            await this.Account.deleteSessions();
        }
        catch(error){
            console.log("appwrite logout",error);
        }
    }
}
const authservice = new Authservice();
export default authservice;