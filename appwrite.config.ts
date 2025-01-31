import { Client, Account, ID, Avatars ,Databases, Query} from "react-native-appwrite";

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

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    console.log(error);
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