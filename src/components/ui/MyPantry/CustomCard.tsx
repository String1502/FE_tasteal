import { Card, CardProps } from '@mui/material';
import React from 'react';

function CustomCard({
    children,
    ...props
}: {
    children: React.ReactNode;
    props?: CardProps;
}) {
    return (
        <Card
            sx={{
                borderRadius: '16px',
                transition: 'all 0.175s ease-in-out',
                cursor: 'pointer',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px 0px',

                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 15px 0.3px',
                },
                ...props.props?.sx,
            }}
        >
            {children}
        </Card>
    );
}

export default CustomCard;
