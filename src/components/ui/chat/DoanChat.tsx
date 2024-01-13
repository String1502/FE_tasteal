import UserChat from '@/lib/models/entities/ChatEntity/UserChat';
import { removeDiacritics } from '@/utils/format';
import { Tab, Tabs } from '@mui/material';
import React from 'react';
import UserChatDisplay from './UserChatDisplay';

function DoanChat({
  chatId,
  handleChatIdChange,
  userChatData,
  searchText,
}: {
  chatId: string;
  handleChatIdChange: (
    event: React.SyntheticEvent,
    newValue: string
  ) => Promise<void>;
  userChatData: UserChat;
  searchText: string;
}) {
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={chatId}
      onChange={handleChatIdChange}
      textColor="secondary"
      indicatorColor="secondary"
      scrollButtons={false}
      sx={{
        height: '100%',
      }}
    >
      {userChatData.chatWith
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .filter((item) =>
          removeDiacritics(item.userInfor.name.toLowerCase()).includes(
            removeDiacritics(searchText.toLowerCase())
          )
        )
        .map((item, index) => (
          <Tab
            key={index}
            value={item.userInfor.uid}
            label={
              <UserChatDisplay
                item={item.userInfor}
                isRead={item.isRead}
                lastMessage={item.lastMessage}
                date={item.date}
              />
            }
          />
        ))}
    </Tabs>
  );
}

export default DoanChat;
