import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {

        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectiontID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite Service :: create post :: error", error);
        }
    }

    async updatePost(slug, { title, content,status, featuredImage }) {

        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectiontID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            console.log("Appwrite Service :: update post :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectiontID,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: Delete Post :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {

            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectiontID,
                slug
            )

        } catch (error) {
            console.log("Appwrite Service :: Get Post :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectiontID,
                queries,
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload services

    async uploadFile(file) {

        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: Upload File :: error", error);
            return false;

        }

    }

    async deleteFile(fileId) {

        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
            )
            return true;

        } catch (error) {
            console.log("Appwrite Service :: Delete File :: error", error);
            return false;

        }

    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileId
        )
    }
}

const service = new Service()
export default service;