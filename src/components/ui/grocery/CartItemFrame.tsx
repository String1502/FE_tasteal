import { Box, Typography } from '@mui/material';
import React from 'react';

function CartItemFrame({
  children,
  label,
}: {
  children?: React.ReactNode;
  label: string;
}) {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          background: 'white',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            width: '100%',
            textAlign: 'left',
            mb: 1,
            color: 'grey.600',
            px: 3,
            pt: 2,
            pb: 1,
          }}
          fontWeight={900}
        >
          {label}
        </Typography>
        {children}
      </Box>
    </>
  );
}

export default CartItemFrame;
