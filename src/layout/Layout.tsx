import { Box } from '@mui/material';
import React from 'react';
import { Footer } from '../components/ui/layout/Footer';
import { Header } from '../components/ui/layout/Header';
import { ChatFrame } from '@/components/ui/chat/ChatFrame';

function Layout({
  withFooter = true,
  children,
  isDynamicHeader = true,
  headerPosition = 'fixed',
}: {
  withFooter?: boolean;
  children: React.ReactNode;
  isDynamicHeader?: boolean;
  headerPosition?: 'fixed' | 'static';
}) {
  return (
    <Box
      component={'div'}
      sx={{
        px: 0,
        backgroundColor: 'background.default',
      }}
    >
      <Header
        isDynamicHeader={isDynamicHeader}
        headerPosition={headerPosition}
      />
      <Box
        sx={{
          minHeight: '90dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      {withFooter && <Footer />}
      <ChatFrame />
    </Box>
  );
}

export default Layout;
