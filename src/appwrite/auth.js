import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);

        this.account = new Account(this.client);
    }

    // async createAccount({email, password, name}){
    //     try{
    //         const userAccount = await this.account.create(ID.unique(), email, password, name);
    //         if(userAccount){
    //             // return userAccount;
    //             // calling another method
    //             return this.login({email, password});

    //         }else{
    //             return userAccount;
    //         }

    //     }catch(error){
    //         console.log("Appwrite Service :: createAccount :: error", error);
    //     }
    // }

    // async login({email, password}) {
    //     try{
    //         return await this.account.createEmailSession(email, password);
    //     }catch(error){
    //         throw error;
    //     }
    // }

    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            console.log("Appwrite Service :: getCurrentuser :: error", error);
        }

        return null;

    }

    // async logout(){
    //     try{
    //          await this.account.deleteSessions();
    //     }catch(error){
    //         console.log("Appwrite Service :: logout :: error", error);
    //     }

    // }

    createAccount({ email, password, name }) {
        this.account.create(ID.unique(), email, password, name).then(() => {
            return this.login({email, password});
        }).catch((error) => {
            console.log("appwrite::Auth Service::createAccount::", error);
        });
    }

    login = ({ email, password }) => {
        this.account.createEmailSession(email, password)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log("appwrite::Auth Service::login::", error);
            })
    }

    currentUser = () => {
        this.account.get()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log("appwrite::Auth Service::currentUser::", error);
            })
    }

    logout = () => {
        this.account.deleteSessions()
            .then((response) => {
                console.log("Delete Session", response);
            }).catch((error) => {
                console.log("appwrite::Auth Service::logout::", error);
            })
    }
}

const authService = new AuthService();


export default authService;