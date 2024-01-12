import BoxImage from '@/components/common/image/BoxImage';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const squareUnitAva = '16%';
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
          width: squareUnitAva,
          minWidth: squareUnitAva,
          maxWidth: squareUnitAva,
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
            quality={1}
          />
        </Avatar>
      </Box>

      <Stack
        direction="column"
        justifyContent={'center'}
        alignItems={'flex-start'}
        sx={{
          pl: 2,
          width: `calc(100% - ${squareUnitAva})`,
          maxWidth: `calc(100% - ${squareUnitAva})`,
          minWidth: `calc(100% - ${squareUnitAva})`,
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
        {lastMessage != undefined ? (
          <Stack
            direction="row"
            justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <Box
              sx={{
                width: '70%',
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
                  textTransform: 'none',
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
              {getDisplayTime(date)}
            </Typography>
          </Stack>
        ) : (
          <>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="body2"
                fontWeight={'regular'}
                sx={{
                  textAlign: 'left',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textTransform: 'none',
                }}
              >
                {item.slogan}
              </Typography>
            </Box>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default UserChatDisplay;

const getDisplayTime = (date?: Date) => {
  const now = new Date();
  if (!date) {
    return now.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  if (date.toDateString() == now.toDateString()) {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};
