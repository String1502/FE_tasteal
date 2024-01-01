import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

type Message = {
  id: string;
  date: Date;
  sender: {
    name: string;
    uid: string;
  };
  text: string[];
};

type Chat = {
  id: string;
  messages: Message[];
};

const chatConverter: FirestoreDataConverter<Chat> = {
  toFirestore: (obj: Chat) => {
    // const { id, ...data } = obj;

    return obj;
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);

    const object = {
      ...data,
      id: snapshot.id,
      messages: data.messages.map((item: any) => {
        return {
          id: item.id,
          date: item.date.toDate(),
          sender: item.sender,
          text: item.text,
        } as Message;
      }),
    } as Chat;

    return object;
  },
};

export default Chat;
export type { Message, Chat };
export { chatConverter };
