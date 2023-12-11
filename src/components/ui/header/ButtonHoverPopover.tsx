import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Popover, useTheme } from '@mui/material';
import React from 'react';

export function ButtonHoverPopover({
    children,
    customLink,
}: {
    children: React.ReactNode;
    customLink: React.ReactNode;
}) {
    const theme = useTheme();
    const [anchorElement, setAnchorEl] = React.useState<HTMLElement | null>(
        null
    );

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorElement);

    return (
        <div>
            <Box
                onMouseEnter={handlePopoverOpen}
                sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {customLink}
                <ExpandMoreRounded color="primary" />
            </Box>
            <Popover
                open={open}
                anchorEl={anchorElement}
                anchorReference="anchorPosition"
                onClose={handlePopoverClose}
                elevation={3}
                anchorPosition={{
                    top: anchorElement ? anchorElement.offsetHeight + 36 : 0,
                    left: 0,
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: '16px',
                            overflow: 'visible',
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100vw',
                        position: 'relative',
                    }}
                    onMouseLeave={handlePopoverClose}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: anchorElement
                                ? -anchorElement.offsetTop -
                                  anchorElement.offsetHeight -
                                  10
                                : 0,
                            left: anchorElement
                                ? anchorElement.getBoundingClientRect().left -
                                  16
                                : 0,
                            width: anchorElement
                                ? anchorElement.offsetWidth
                                : 0,
                            height: anchorElement
                                ? anchorElement.offsetTop +
                                  anchorElement.offsetHeight +
                                  10
                                : 0,
                        }}
                    />
                    {children}
                </Box>
            </Popover>
        </div>
    );
}
