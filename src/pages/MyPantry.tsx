import React, { useContext, useState } from 'react';
import Ingredient_Component from '@/components/ui/MyPantry/Ingredient_Component';
import {
    Container,
    Grid,
    Typography,
    Box,
    Tabs,
    Tab,
    styled,
} from '@mui/material';
import Layout from '../layout/Layout';
import AppContext from '@/lib/contexts/AppContext';

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
        }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
    '& .MuiTab-root': {
        flexGrow: 1, // Equal distribution among tabs
        backgroundColor: 'white',
        color: '#777d86',
        '&:hover': {
            color: '#01404e',
        },
        '&.Mui-selected': {
            color: '#01404e',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    },
});

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: '#777d86', // Change text color to black
    backgroundColor: 'white', // Change background color to white
    '&.Mui-selected': {
        color: '#01404e',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
const CustomTabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
};
const MyPantry: React.FC = () => {
    const { login } = useContext(AppContext);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Layout>
            {login.isUserSignedIn && (
                <Container>
                    <Grid
                        container
                        alignItems={'stretch'}
                        justifyContent={'center'}
                        sx={{
                            my: 4,
                        }}
                    >
                        <Grid
                            item
                            xs={3}
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    backgroundColor: 'red',
                                }}
                            >
                                Vừa ra mắt
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={9}
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                            }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ bgcolor: 'white' }}>
                                    <StyledTabs
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="styled tabs example"
                                    >
                                        <StyledTab label="Nguyên liệu của tôi" />
                                        <StyledTab label="Ý tưởng công thức" />
                                    </StyledTabs>
                                    <CustomTabPanel
                                        value={value}
                                        index={0}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                padding: 3,
                                                borderRadius: 4,
                                                border: 1,
                                                borderColor: 'gray',
                                            }}
                                        >
                                           <Ingredient_Component/>
                                        </Box>
                                    </CustomTabPanel>
                                    <CustomTabPanel
                                        value={value}
                                        index={1}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                padding: 3,
                                                borderRadius: 4,
                                                border: 1,
                                                borderColor: 'gray',
                                            }}
                                        >
                                            <Typography variant="h6">
                                                Content for Nguyên liệu của tôi
                                                goes here.
                                            </Typography>
                                           
                                        </Box>
                                    </CustomTabPanel>
                                    <Box sx={{ p: 3 }} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            )}
            {!login.isUserSignedIn && (
                <>
                    <h1>Lỗi đăng nhập</h1>
                </>
            )}
        </Layout>
    );
};

export default MyPantry;
