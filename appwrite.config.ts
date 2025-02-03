import { Client, Account, ID, Avatars ,Databases, Query,Storage} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  Platform: "com.takondwakapyola.aura",
  projectId: "64c6d3f2c2f0d2c1d4d4",
  databaseId: "679c89c70035846bd41d",
  userCollectionId: "679c89e30006672731a7",
  videoCollectionId: "679c8a0b00268185a301",
  bucketId: "679c8b2a002f532cb843",
};

export const client = new Client()
  .setProject("679b2911002f7e314031")
  .setPlatform("com.takondwakapyola.aura");

  const account = new Account(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Creates a new user account and stores the user information in the database.
 * 
 * @param {Object} params - The user details.
 * @param {string} params.username - The username for the new user.
 * @param {string} params.email - The email address for the new user.
 * @param {string} params.password - The password for the new user.
 * 
 * @returns {Promise<Object>} The created user document.
 * 
 * @throws {Error} If user creation or database operation fails.
 */

/******  183b6f4f-b3ec-4564-8e28-be13a882f255  *******/
export const createUSer = async ({ username, email, password }:{username: string, email: string, password: string}) => {

  try{
  const newAccount = await  account.create(ID.unique(), email, password, username);

  if(!newAccount){
    throw new Error("Failed to create user");
  }else{
    console.log(newAccount);
    const avatarUrl = avatars.getInitials(username);

    await signIn({ email,password});

    const newUSer = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username: username,
        email,
        avatar: avatarUrl,
      }
    )

    return newUSer;

  }


  }catch(error: any){
    console.log(error);
    throw new Error(error);
  }
};

export const signIn= async({email, password}:{email: string, password: string}) => {

  try{
   const session = await account.createEmailPasswordSession(email, password);

   if(!session){
    throw new Error("Failed to sign in");
   }else{
    return session;
   }
  }catch(error: any){
    console.log(error);
    throw new Error(error);
  }

}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getUser = async () => {
  try {
    const user = await account.get();
    if(!user) throw new Error;
    const currentUser = await databases.listDocuments(appwriteConfig.databaseId, 
      appwriteConfig.userCollectionId,
      [
        Query.equal("accountId", user.$id)
      ]);

    if(!currentUser) throw new Error;
    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}




export const getVideos = async () => {
  try {
    const videos = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc("$createdAt")]);
    return videos.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const getLatest = async () => {
  try {
    const videos = await databases.listDocuments(appwriteConfig.databaseId,
       appwriteConfig.videoCollectionId, 
       [Query.orderDesc("$createdAt"), Query.limit(7)]);
    return videos.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}


export const searchPosts = async (searchQuery: string): Promise<Appwrite.Document[]> => {
  try {
    const searchQueryLowercase = searchQuery.toLocaleLowerCase();
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [
        Query.search("title", searchQueryLowercase),
      ],
    );

    return videos.documents;
  } catch (error) {
    throw new Error(error);
  }
};



export async function getUserVideos(userId: string): Promise<Appwrite.Document[]> {
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return videos.documents;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user videos");
  }
}


export async function uploadVideo(video: any) {
  const user = await getUser();
  try {

    const [thumbnail_uri,video_uri] = await Promise.all([
      uploadFile({file: video.thumbnail, type: "image"}),
      uploadFile({file: video.video, type: "video"})
    ])

    const newPost =  databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: video.title,
        video: video_uri,
        thumbnail: thumbnail_uri,
        prompt : video.prompt,
        creator: user.$id
      },
    )

    return newPost;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload video");
  }
}

export async function uploadFile({file,type}: {file: any, type: string} ){
if(!file) return;

const { mimeType , ...rest} = file;
const asset = { type: mimeType, ...rest};

console.log(mimeType);
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      asset,
    );

 const fileUrl = await getFilePreview(uploadedFile.$id,type);
 return fileUrl;
   

  }catch(e){
    throw new Error(e);

  }finally{

  }
}


export async function getFilePreview(fileId: string,type: string) {
  let fileUrl;
  try {
   if(type === "video"){
    fileUrl = await storage.getFileView(appwriteConfig.bucketId, fileId);
    return fileUrl;
   }else{
    fileUrl = storage.getFilePreview(appwriteConfig.bucketId, fileId,2000,2000,'top',100);
    return fileUrl;
   }

   if(!fileUrl) throw new Error;

  } catch (error) {
    console.error(error);
    throw new Error("Failed to get file preview");
  }
}