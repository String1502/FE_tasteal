import { Box } from '@mui/material';
import React from 'react';
import { Footer } from '../components/ui/layout/Footer';
import { Header } from '../components/ui/layout/Header';

function Layout({
    withFooter = true,
    children,
}: {
    withFooter?: boolean;
    children: React.ReactNode;
}) {
    return (
        <Box
            component={'div'}
            sx={{
                px: 0,
                backgroundColor: 'background.default',
            }}
        >
            <Header />
            <Box
                sx={{
                    minHeight: '100dvh',
                }}
            >
                {children}
            </Box>
            {withFooter && <Footer />}
        </Box>
    );
}

export default Layout;
