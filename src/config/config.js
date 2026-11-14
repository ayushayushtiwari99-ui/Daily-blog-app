const config={
    appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteproductid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCOLLECTIONid: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwritebucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyapikey: String(import.meta.env.VITE_TINY_API),
}

export default config