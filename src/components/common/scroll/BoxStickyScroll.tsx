import { Box } from '@mui/material';
import React from 'react';

function BoxStickyScroll({
  top,
  children,
}: {
  top?: number;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        position: {
          xs: 'static',
          md: 'sticky',
        },
        top: `${top ? top : 0}px`,
        // transform: {
        //   md:
        //     scroll?.isHeaderHide == false
        //       ? scroll.scrollPos < headerHeight + 68
        //         ? `translateY(${0}px)`
        //         : `translateY(${headerHeight}px)`
        //       : `translateY(${0}px)`,
        // },
        transition: 'transform 0.2s ease-in-out',
        maxHeight: { lg: '100dvh' },
        height: 'auto',
      }}
    >
      {children}
    </Box>
  );
}

export default BoxStickyScroll;
