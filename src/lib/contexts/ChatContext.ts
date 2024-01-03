import { createContext, useEffect, useReducer } from 'react';
import AccountService from '../services/accountService';
import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export type ChatContextType = {
  canChat: boolean;
  open: boolean;
  //
  sender?: AccountEntity;
  receiver?: AccountEntity;
  combileId: string;
};

export interface ChatAction {
  type: 'setCanChat' | 'setOpen' | 'setSender' | 'setReceiver';
  payload: ChatContextType;
}

const INITIAL_STATE: ChatContextType = {
  canChat: false,
  open: false,
  //
  sender: undefined,
  receiver: undefined,
  combileId: '',
};

export const compareTwoUid = (uid1: string, uid2: string) => {
  return uid1 < uid2 ? uid1 + '_' + uid2 : uid2 + '_' + uid1;
};

export const ChatContext = createContext<{
  state: ChatContextType;
  dispatch: React.Dispatch<ChatAction>;
}>({
  state: {
    ...INITIAL_STATE,
  },
  dispatch: () => {},
});

export function initChatContext() {
  const chatReducer = (
    state: ChatContextType,
    action: ChatAction
  ): ChatContextType => {
    switch (action.type) {
      case 'setCanChat':
        return {
          ...action.payload,
          canChat: action.payload.canChat,
        };
      case 'setOpen':
        return {
          ...action.payload,
          open: action.payload.open,
        };
      case 'setSender': {
        let combileId = '';
        if (
          action.payload.sender &&
          action.payload.receiver &&
          action.payload.sender.uid != '' &&
          action.payload.receiver.uid != ''
        ) {
          combileId = compareTwoUid(
            action.payload.sender.uid,
            action.payload.receiver.uid
          );
        }
        return {
          ...action.payload,
          sender: action.payload.sender,
          combileId: combileId,
        };
      }
      case 'setReceiver': {
        let combileId = '';
        if (
          action.payload.sender &&
          action.payload.receiver &&
          action.payload.sender.uid != '' &&
          action.payload.receiver.uid != ''
        ) {
          combileId = compareTwoUid(
            action.payload.sender.uid,
            action.payload.receiver.uid
          );
        }

        return {
          ...action.payload,
          receiver: action.payload.receiver,
          combileId: combileId,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await AccountService.GetByUid(user.uid);

        if (!userData) return;
        dispatch({
          type: 'setSender',
          payload: {
            ...state,
            sender: { ...userData },
            receiver: undefined,
            canChat: true,
          },
        });
      } else {
        dispatch({
          type: 'setSender',
          payload: {
            ...state,
            sender: undefined,
            receiver: undefined,
            canChat: false,
          },
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(state);

  return {
    state,
    dispatch,
  };
}
