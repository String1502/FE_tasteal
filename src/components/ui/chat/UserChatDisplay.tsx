import BoxImage from '@/components/common/image/BoxImage';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { Avatar, Box, Stack, Typography } from '@mui/material';

function UserChatDisplay({
  item,
  isRead,
  lastMessage,
  date,
}: {
  item: AccountEntity;
  isRead?: boolean;
  lastMessage?: string;
  date?: Date;
}) {
  return (
    <Stack
      direction="row"
      alignItems={'center'}
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '20%',
          minWidth: '20%',
          maxWidth: '20%',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          backgroundColor: 'secondary.main',
        }}
      >
        <Avatar
          sx={{
            width: '100%',
            height: '100%',
            fontSize: 'body2.fontSize',
          }}
          alt={item.name}
        >
          <BoxImage
            src={item.avatar}
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
            }}
            quality={70}
          />
        </Avatar>
      </Box>

      <Stack
        direction="column"
        justifyContent={'center'}
        alignItems={'flex-start'}
        sx={{
          pl: 2,
          width: '80%',
          maxWidth: '80%',
          minWidth: '80%',
          py: 0.5,
        }}
      >
        <Typography
          variant="body2"
          fontWeight={900}
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%',
            textAlign: 'left',
          }}
        >
          {item.name}
        </Typography>
        {lastMessage != undefined && (
          <Stack
            direction="row"
            justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <Box
              component={'div'}
              sx={{
                width: '75%',
              }}
            >
              <Typography
                variant="body2"
                fontWeight={isRead == true ? 'regular' : 'bold'}
                sx={{
                  textAlign: 'left',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {lastMessage}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              sx={{
                textAlign: 'right',
              }}
            >
              {date?.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default UserChatDisplay;
