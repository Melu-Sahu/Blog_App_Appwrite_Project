const config = {
    appwriteUrl: String(import.meta.env.VITE_APP_APPWRITE_URL),
    appwriteProjectID: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),
    appwriteCollectiontID: String(import.meta.env.VITE_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketID: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID)
}

export default config