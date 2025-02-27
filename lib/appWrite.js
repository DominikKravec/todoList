import { Client, Databases, Query, Storage } from 'react-native-appwrite';
import { Account, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.domko.toDoList',
    projectId: '6686868b00320384f5b7',
    databaseId: '668687e5000128ffb632',
    userCollectionId: '668687f40026785169f4',
    taskCollectionId: '668687ff0025264d90df',
}

const {projectId, databaseId, userCollectionId, taskCollectionId } = appwriteConfig

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const databases = new Databases(client);
//const storage = new Storage(client)

export const createUser = async (username, email, password) => {
    try {

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        console.log(newAccount)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            databaseId, 
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
            }
        )

        console.log("User created successfully")

        return newUser
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function signIn(email, password){
    try{
        const session = await account.createEmailPasswordSession(email, password)
        return session
    }catch(error){
        throw new Error(error)
    }
}

export async function getCurrentUser(){
    try {
        const currentAcount = await account.get();
        if(!currentAcount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAcount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export async function getMyTasks(userId) {
    try {
        const tasks = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.taskCollectionId,
            [Query.equal('owner', userId)]
        )

        return tasks.documents
    } catch (error) {
        throw new Error(error)
    }
}

export async function databaseSetIsChecked(taskId, value){
    try {
        databases.updateDocument(
            databaseId,
            taskCollectionId,
            taskId,
            {
                checked: value
            }
        )
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteTask(taskId){
    try {
        databases.deleteDocument(
            databaseId,
            taskCollectionId,
            taskId
        )
    } catch (error) {
        throw new Error
    }
}

export async function addTask(form){
    try{
        const newTask = databases.createDocument(
            databaseId,
            taskCollectionId,
            ID.unique(),
            {
                title: form.title,
                dueDate: form.dueDate,
                checked: false,
                description: form.description,
                owner: form.owner
            }
        )
    }catch (error){
        throw new Error(error)
    }
}