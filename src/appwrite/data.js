import config from "../config/config";
import { Client, ID, Databases ,Storage , Query} from "appwrite";

export class Service{
   client = new Client();
   database;
   bucket;

   constructor(){
    this.client
      .setEndpoint(config.appwriteurl)
      .setProject(config.appwriteproductid)

      this.database = new Databases(this.client)
      this.bucket = new Storage(this.client)
   }
    // file uplode services 
   async createPost({title ,slug ,content ,featuredimage ,status ,userid}){
      try{
         return await this.database.createDocument(
            config.appwritedatabaseid,
            config.appwriteCOLLECTIONid,
            slug,
            {
                title,
                content,
                status,
                image: featuredimage,
                user: userid,
            }
         )
      }
      catch(error){
        throw error;
      }
   }

   async  updatePost(slug,{title ,content ,featuredimage ,status}){
     try{
        return await this.database.updateDocument(
            config.appwritedatabaseid,
            config.appwriteCOLLECTIONid,
            slug,
            {
                title,
                content,
                status,
                featuredimage,
            }
        )
     }  
     catch(error){
        throw error;
     }
   }

   async deletePost(slug){
    try{
        await this.database.deleteDocument(
            config.appwritedatabaseid,
            config.appwriteCOLLECTIONid,
            slug,
        )
        return true;
    }
    catch(error){
        console.log("delete",error);
        return false;
    }
   }

   async getPost(slug){
    try{
       return await this.database.getDocument(
        config.appwritedatabaseid,
        config.appwriteCOLLECTIONid,
        slug,
       )
    }
    catch(error){
        console.log("get post",error);
        return false;
    }
   }

   async getPosts(query = [Query.equal("status","active")]){
    try{
         return await this.database.listDocuments(
            config.appwritedatabaseid,
            config.appwriteCOLLECTIONid,
            query,
         )
    }
    catch(error){
         console.log("posts",error);
         return false;
    }
   }

   async uplodeFile(file){
    try{
        return await this.bucket.createFile(
            config.appwritebucketid,
            ID.unique(),
            file,
        )
    }
    catch(error){
        console.log("file",error);
        return false;
    }
   }

   async deleteFile(fileid){
    try{
        await this.bucket.deleteFile(
            config.appwritebucketid,
            fileid,
        )
        return true;
    }
    catch(error){
        console.log("delete file",error);
        return false;
    }
   }

   getFilePreview(fileid){
     return this.bucket.getFileView(
        config.appwritebucketid,
        fileid,
     )
   }
}
const service = new Service()
export default service;