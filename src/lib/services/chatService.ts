import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import UserChat, {
  userChatConverter,
} from '../models/entities/ChatEntity/UserChat';
import { db } from '../firebase/config';
import Chat, { chatConverter } from '../models/entities/ChatEntity/Chat';

class ChatService {
  public static collectionName = {
    userChats: 'user_chats',
    chats: 'chats',
  };

  //#region UserChat
  private static getUserChatsRef(): CollectionReference<UserChat> {
    return collection(db, this.collectionName.userChats).withConverter(
      userChatConverter
    );
  }

  private static getUserChatRefByUid(uid: string): DocumentReference<UserChat> {
    return doc(this.getUserChatsRef(), uid).withConverter(userChatConverter);
  }

  private static async getUserChatSnapshots(): Promise<
    QuerySnapshot<UserChat>
  > {
    const collectionRef = this.getUserChatsRef();
    return await getDocs(collectionRef);
  }

  public static async getUserChats(): Promise<UserChat[]> {
    const snapshot = await this.getUserChatSnapshots();

    return snapshot.docs.map((doc) => doc.data());
  }

  private static async getUserChatSnapshot(
    uid: string
  ): Promise<DocumentSnapshot<UserChat>> {
    return await getDoc(this.getUserChatRefByUid(uid));
  }

  public static async getUserChat(uid: string): Promise<UserChat | undefined> {
    return (await this.getUserChatSnapshot(uid)).data();
  }

  public static async updateUserChat(
    uid: string,
    data: Omit<UserChat, 'uid'>
  ): Promise<void> {
    await updateDoc(this.getUserChatRefByUid(uid), data);
  }

  public static async createUserChat(data: UserChat) {
    return await setDoc(
      doc(db, this.collectionName.userChats, data.uid).withConverter(
        userChatConverter
      ),
      data
    );
  }

  public static async deleteUserChat(uid: string): Promise<void> {
    await deleteDoc(this.getUserChatRefByUid(uid));
  }

  //#endregion

  //#region Chat
  private static getChatsRef(): CollectionReference<Chat> {
    return collection(db, this.collectionName.chats).withConverter(
      chatConverter
    );
  }

  private static getChatRefById(id: string): DocumentReference<Chat> {
    return doc(this.getChatsRef(), id).withConverter(chatConverter);
  }

  private static async getChatSnapshots(): Promise<QuerySnapshot<Chat>> {
    const collectionRef = this.getChatsRef();
    return await getDocs(collectionRef);
  }

  public static async getChats(): Promise<Chat[]> {
    const snapshot = await this.getChatSnapshots();
    return snapshot.docs.map((doc) => doc.data());
  }

  private static async getChatSnapshot(
    id: string
  ): Promise<DocumentSnapshot<Chat>> {
    return await getDoc(this.getChatRefById(id));
  }

  public static async getChat(id: string): Promise<Chat | undefined> {
    return (await this.getChatSnapshot(id)).data();
  }

  public static async updateChat(
    id: string,
    data: Omit<Chat, 'id'>
  ): Promise<void> {
    await updateDoc(this.getChatRefById(id), data);
  }

  public static async createChat(data: Chat) {
    return await setDoc(
      doc(db, this.collectionName.chats, data.id).withConverter(chatConverter),
      data
    );
  }

  public static async deleteChat(id: string): Promise<void> {
    await deleteDoc(this.getChatRefById(id));
  }

  //#endregion
}

export default ChatService;
