import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

type ChatWithType = {
  id: string;
  date: Date;
  userInfor: {
    name: string;
    uid: string;
  };
  lastMessage: string;
  isRead: boolean;
};

type UserChat = {
  uid: string;
  chatWith: ChatWithType[];
};

const userChatConverter: FirestoreDataConverter<UserChat> = {
  toFirestore: (obj: UserChat) => {
    // const { uid, ...data } = obj;

    return obj;
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);

    const object = {
      ...data,
      uid: snapshot.id,
      chatWith: data.chatWith.map((item: any) => {
        return {
          id: item.id,
          date: item.date.toDate(),
          userInfor: item.userInfor,
          lastMessage: item.lastMessage,
          isRead: item.isRead,
        } as ChatWithType;
      }),
    } as UserChat;

    return object;
  },
};

export default UserChat;
export type { ChatWithType, UserChat };
export { userChatConverter };
