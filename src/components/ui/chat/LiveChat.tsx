import { ChatContext, compareTwoUid } from '@/lib/contexts/ChatContext';
import UserChat from '@/lib/models/entities/ChatEntity/UserChat';
import ChatService from '@/lib/services/chatService';
import {
  ChatRounded,
  // MessageRounded,
  SearchRounded,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  IconButton,
  IconButtonProps,
  InputAdornment,
  Popover,
  Stack,
  SvgIconProps,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { removeDiacritics } from '@/utils/format';
import AccountService from '@/lib/services/accountService';
import ChatCommunity from './ChatCommunity';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import UserChatDisplay from './UserChatDisplay';
import DoanChat from './DoanChat';

export const iconButtonProp: IconButtonProps = {
  size: 'small',
  sx: {
    color: 'primary.main',
    '&:hover': {
      color: 'secondary.main',
      backgroundColor: 'primary.main',
    },
  },
};

export const iconProp: SvgIconProps = {
  fontSize: 'inherit',
  color: 'inherit',
};

const amountLoad = 15;

function LiveChat() {
  const theme = useTheme();
  const { state, dispatch } = useContext(ChatContext);
  const [searchText, setSearchText] = useState<string>('');
  const [userChatData, setUserChatData] = useState<UserChat | undefined>(
    undefined
  );
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!state.sender || state.sender.uid == '') {
      return;
    }

    const unsub = onSnapshot(
      ChatService.getUserChatRefByUid(state.sender.uid),
      (doc) => {
        let data = doc.data();
        if (!data) {
          setIsNew(false);
        } else {
          const isRead = data.chatWith.find(
            (item) => item.id == state.combileId
          )?.isRead;
          if (isRead == false) {
            setIsNew(true);
          } else {
            setIsNew(false);
          }
        }
      }
    );

    return () => {
      unsub();
    };
  }, [state.sender]);

  // #region popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  //#endregion

  // #region tab nội dung
  const [tabValue, setTabValue] = useState('one');

  const handleChangeTabValue = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setTabValue(newValue);
  };
  //#endregion

  // #region chat
  const [chatId, setChatId] = useState(state.combileId);

  // async function getuserchat() {
  //   try {
  //     if (!state.sender || state.sender.uid == '') return;
  //     const userChat = await ChatService.getUserChat(state.sender.uid);
  //     console.log(userChat);

  //     if (!userChat) {
  //       const data: UserChat = {
  //         uid: state.sender.uid,
  //         chatWith: [],
  //       };
  //       await ChatService.createUserChat(data);
  //     } else {
  //       const isRead = userChat.chatWith.find(
  //         (item) => item.id == state.combileId
  //       )?.isRead;
  //       if (isRead == false) {
  //         await ChatService.updateUserChat(userChat.uid, {
  //           ...userChat,
  //           chatWith: userChat.chatWith.map((item) => {
  //             if (item.id == state.combileId) {
  //               return {
  //                 ...item,
  //                 isRead: true,
  //               };
  //             } else {
  //               return item;
  //             }
  //           }),
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  console.log(state);

  const handleChatIdChange = async (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    let userChat: UserChat | undefined = userChatData;

    // Chưa từng tạo userchat
    if (!userChat) {
      if (!state.sender || state.sender.uid == '') return;
      const userChatFromFB = await ChatService.getUserChat(state.sender.uid);

      if (!userChatFromFB) {
        const data: UserChat = {
          uid: state.sender.uid,
          chatWith: [],
        };
        await ChatService.createUserChat(data);
        userChat = data;
      } else {
        userChat = userChatFromFB;
      }
    }

    console.log(userChat);
    if (!userChat) {
      return;
    }

    // người nhận chưa có userchat
    const receiverUserChat = await ChatService.getUserChat(newValue);
    if (!receiverUserChat) {
      const data: UserChat = {
        uid: newValue,
        chatWith: [],
      };
      await ChatService.createUserChat(data);
    }

    // --
    const combileId = compareTwoUid(userChat.uid, newValue);
    setChatId(combileId);
    const receiver = userChat.chatWith.find((chat) => chat.id === combileId);
    if (receiver) {
      dispatch({
        type: 'setReceiver',
        payload: {
          ...state,
          receiver: receiver.userInfor,
          open: true,
        },
      });
      if (receiver.isRead == false) {
        const updateUserChat: UserChat = {
          ...userChat,
          chatWith: userChat.chatWith.map((item) => {
            if (item.id === combileId) {
              return {
                ...item,
                isRead: true,
              };
            } else {
              return item;
            }
          }),
        };
        setUserChatData(updateUserChat);
        await ChatService.updateUserChat(state.sender.uid, updateUserChat);
      }
    } else {
      const getReceiver = await AccountService.GetByUid(newValue);
      dispatch({
        type: 'setReceiver',
        payload: {
          ...state,
          receiver: getReceiver,
          open: true,
        },
      });
    }
    handleClose();
  };
  //#endregion

  // #region Cộng đồng
  const [userData, setUserData] = useState<AccountEntity[]>([]);
  const [end, setEnd] = useState(false);
  const loadNext = async () => {
    try {
      const data = await AccountService.GetAllUser(amountLoad, page + 1);
      setUserData([...userData, ...data]);
      setPage(page + 1);
      if (data.length < amountLoad) setEnd(true);
    } catch (error) {
      console.log(error);
      setEnd(true);
    }
  };
  const [page, setPage] = useState(1);

  //#endregion

  useEffect(() => {
    if (!state.sender || state.sender.uid == '') return;
    const unsub = onSnapshot(
      ChatService.getUserChatRefByUid(state.sender.uid),
      (doc) => {
        let data = doc.data();
        console.log(data);

        setUserChatData(data);
      }
    );
    return () => {
      unsub();
    };
  }, [state.sender]);

  useEffect(() => {
    async function load() {
      try {
        const data = await AccountService.GetAllUser(amountLoad, page);
        setUserData(data);
      } catch (error) {
        console.log(error);
        setEnd(true);
      }
    }
    load();
  }, []);

  return (
    <>
      <Badge badgeContent={isNew ? 1 : 0} color="secondary">
        <IconButton
          color="primary"
          size="small"
          sx={{
            border: 1,
            mr: 2,
          }}
          onClick={handleClick}
        >
          <ChatRounded fontSize="inherit" />
        </IconButton>
      </Badge>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              boxShadow: 6,
              mt: 1,
              width: '360px',
              overflow: 'hidden',
            },
          },
        }}
      >
        <Stack
          sx={{
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <Stack
            direction={'column'}
            spacing={1}
            sx={{
              px: 2,
              pt: 1,
              borderBottom: 1,
              borderColor: 'grey.400',
            }}
          >
            <Typography
              variant="body1"
              fontWeight={'bold'}
              sx={{
                width: '100%',
              }}
            >
              Đoạn chat
            </Typography>

            <TextField
              fullWidth
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Tìm theo tên"
              sx={{
                backgroundColor: 'white',
                '& fieldset': { border: 'none' },
                border: 1,
                borderRadius: '100px',
              }}
              InputProps={{
                sx: {
                  fontSize: 'body2.fontSize',
                  fontWeight: 500,
                  px: 1,
                },
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents>
                    <IconButton
                      size="small"
                      sx={{
                        color: 'primary.main',
                      }}
                    >
                      <SearchRounded fontSize="inherit" color="inherit" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Chọn nội dung */}
            <Tabs
              value={tabValue}
              onChange={handleChangeTabValue}
              textColor="primary"
              TabIndicatorProps={{
                sx: {
                  display: 'none',
                },
              }}
              sx={{
                '& .MuiTab-root.Mui-selected': {
                  color: 'white',
                  bgcolor: 'primary.main',
                  borderRadius: '100px',
                },
                '& .MuiTab-root': {
                  borderRadius: '100px',
                  height: '35px',
                  minHeight: '0px',
                  color: 'white',
                  bgcolor: 'grey.600',
                  mx: 0.5,
                },
              }}
            >
              <Tab
                value="one"
                label={
                  <Typography
                    variant="caption"
                    fontWeight={'medium'}
                    sx={{
                      color: 'inherit',
                    }}
                  >
                    Hộp thư
                  </Typography>
                }
              />
              <Tab
                value="two"
                label={
                  <Typography
                    variant="caption"
                    fontWeight={'medium'}
                    sx={{
                      color: 'inherit',
                    }}
                  >
                    Cộng đồng
                  </Typography>
                }
              />
            </Tabs>
          </Stack>

          {/* Đoạn chat */}
          {tabValue == 'one' && (
            <>
              <Box
                sx={{
                  height: '60dvh',
                }}
              >
                {userChatData != undefined && (
                  <DoanChat
                    chatId={chatId}
                    handleChatIdChange={handleChatIdChange}
                    userChatData={userChatData}
                    searchText={searchText}
                  />
                )}
                {(userChatData == undefined ||
                  userChatData.chatWith.length == 0) && (
                  <Box
                    sx={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={'bold'}
                      sx={{
                        color: 'grey.600',
                      }}
                    >
                      Hộp thư trống
                    </Typography>
                  </Box>
                )}
              </Box>
            </>
          )}

          {/* Cộng đồng */}
          {tabValue == 'two' && (
            <ChatCommunity
              userData={userData.filter((item) => {
                return removeDiacritics(item.name.toLowerCase()).includes(
                  removeDiacritics(searchText.toLowerCase())
                );
              })}
              loadNext={loadNext}
              end={end}
              handleUidReceiverChange={handleChatIdChange}
            />
          )}
        </Stack>
      </Popover>
    </>
  );
}

export default LiveChat;
