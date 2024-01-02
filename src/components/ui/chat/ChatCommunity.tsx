import { Button, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderInfiniteScroll from '../search/LoaderInfiniteScroll';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import UserChatDisplay from './UserChatDisplay';
import { useContext } from 'react';
import { ChatContext } from '@/lib/contexts/ChatContext';

function ChatCommunity({
  userData,
  loadNext,
  end,
  handleUidReceiverChange,
}: {
  userData: AccountEntity[];
  loadNext: () => Promise<void>;
  end: boolean;
  handleUidReceiverChange: (
    event: React.SyntheticEvent,
    newValue: string
  ) => void;
}) {
  const { state } = useContext(ChatContext);

  return (
    <InfiniteScroll
      dataLength={userData.length}
      next={loadNext}
      hasMore={!end}
      loader={
        <>
          <LoaderInfiniteScroll />
        </>
      }
      endMessage={
        <>
          <Typography
            variant="body2"
            align="center"
            fontWeight={'bold'}
            sx={{
              width: '100%',
              my: 2,
              color: 'grey.500',
            }}
          >
            {userData.length == 0
              ? 'Hệ thống chưa có tác giả!'
              : 'Đã hiển thị toàn bộ tác giả!'}
          </Typography>
        </>
      }
      height={'fit-content'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        overflowY: 'auto',
        marginTop: 2,
        maxHeight: '60dvh',
      }}
    >
      {userData
        .filter((item) => {
          if (state.sender) {
            return item.uid != state.sender.uid;
          }
          return true;
        })
        .map((item, index) => (
          <Button
            key={index}
            onClick={(event) => handleUidReceiverChange(event, item.uid)}
            sx={{
              width: '100%',
              p: 1,
              borderRadius: '0px',
              '&:hover': {
                bgcolor: 'grey.200',
              },
            }}
          >
            <UserChatDisplay item={item} />
          </Button>
        ))}
    </InfiniteScroll>
  );
}

export default ChatCommunity;
