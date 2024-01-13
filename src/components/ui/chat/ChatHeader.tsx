import { RemoveRounded } from '@mui/icons-material';
import { Box, IconButton, Link, Tooltip } from '@mui/material';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { iconButtonProp, iconProp } from './LiveChat';
import { ChatContext } from '@/lib/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '@/lib/constants/common';

export function ChatHeader() {
  const { state, dispatch } = useContext(ChatContext);
  const navigate = useNavigate();
  return (
    <Box
      component={'div'}
      sx={{
        backgroundColor: 'white',
        px: 2,
        py: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        borderBottom: 1,
        borderColor: 'grey.300',
      }}
    >
      <Box component={'div'}>
        <Tooltip title="Đi đến trang của tác giả">
          <Link
            variant="caption"
            fontWeight={'bold'}
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (state.receiver) {
                navigate(PageRoute.Partner(state.receiver.uid));
              }
            }}
          >
            {state.receiver?.name}
          </Link>
        </Tooltip>
      </Box>

      <Stack direction="row">
        <IconButton
          {...iconButtonProp}
          onClick={() =>
            dispatch({ type: 'setOpen', payload: { ...state, open: false } })
          }
        >
          <RemoveRounded {...iconProp} />
        </IconButton>
      </Stack>
    </Box>
  );
}
