import React, { useContext, useEffect, useState } from 'react';
import Ingredient_Component from '@/components/ui/MyPantry/Ingredient_Component';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { IngredientEntity } from '../lib/models/entities/IngredientEntity/IngredientEntity';
import IngredientService from '../lib/services/ingredientService';
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  styled,
  TextField,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from '@mui/material';
import Layout from '../layout/Layout';
import AppContext from '@/lib/contexts/AppContext';
import { FiberManualRecord } from '@mui/icons-material';
import { Primary_Smaller_Card } from '@/components/ui/MyPantry/Primary_Smaller_Card';

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
    maxWidth: 180,
    width: '100%',
    backgroundColor: '#01404e',
  },
  '& .MuiTab-root': {
    flexGrow: 1, // Equal distribution among tabs
    backgroundColor: 'transparent',
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
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(25),
  marginRight: theme.spacing(1),
  color: '#777d86', // Change text color to black
  backgroundColor: 'transparent', // Change background color to white
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
  const [filteredIngredients, setFilteredIngredients] = useState<
    IngredientEntity[]
  >([]);
  const [ingredient, setIngredient] = useState<IngredientEntity[] | undefined>(
    undefined
  );

  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientEntity | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedIngredients = await IngredientService.GetAll();
        setIngredient(fetchedIngredients);
        setFilteredIngredients(fetchedIngredients); // Initialize with all ingredients
      } catch (error) {
        console.log(error);
        setIngredient([]);
        setFilteredIngredients([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Your logic to reload Ingredient_Component goes here
    console.log('Filtered ingredients changed, reload Ingredient_Component');
  }, [filteredIngredients]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: IngredientEntity) => option.name,
  });

  const handleAutoCompleteChange = (
    event: React.SyntheticEvent,
    value: IngredientEntity | null
  ) => {
    // Update the filtered ingredients based on AutoComplete selection
    if (value) {
      setSelectedIngredient(value);
      // If a value is selected from AutoComplete, set filteredIngredients to that value
      setFilteredIngredients([value]);
    } else {
      // If no value is selected, filter ingredients based on the current AutoComplete input value
      const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
      const filtered = ingredient.filter((item) =>
        item.name.toLowerCase().includes(inputValue)
      );
      setSelectedIngredient(value);
      setFilteredIngredients(filtered);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    const filtered = ingredient.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );

    setFilteredIngredients(filtered);
  };
  // const [expanded, setExpanded] = React.useState<string | false>(false);

  // Create a mapping from ingredient_type to ingredients
  const typeMap = new Map<string, IngredientEntity[]>();
  if (filteredIngredients) {
    filteredIngredients.forEach((ingredient) => {
      const type = ingredient.ingredient_type?.name || 'Uncategorized'; // Use "Uncategorized" if no ingredient_type is specified
      if (!typeMap.has(type)) {
        typeMap.set(type, []);
      }
      typeMap.get(type)?.push(ingredient);
    });
  }
  return (
    <Layout>
      {login.isUserSignedIn && (
        <Container>
          <Grid
            container
            alignItems={'stretch'}
            flexDirection={'row'}
            justifyContent={'center'}
            spacing={8}
            sx={{
              my: 1,
            }}
          >
            <Grid item xs={3}>
              <Box
                sx={{
                  backgroundColor: 'transparent',
                  height: '750px',
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Tủ lạnh của tôi
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Thêm nguyên liệu đang có sẵn ở nhà để tìm công thức có thể nấu
                  ngay bây giờ
                </Typography>
                {Array.from(typeMap.entries()).map(
                  ([type, typeIngredients], index) => (
                    <Accordion
                      key={index}
                      sx={{
                        backgroundColor: 'transparent',
                      }}
                    >
                      <AccordionSummary sx={{ p: 0 }}>
                        <Typography
                          sx={{
                            width: '60%',
                            flexShrink: 0,
                          }}
                        >
                          {type}
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            color: 'text.secondary',
                          }}
                        >
                          <FiberManualRecord
                            sx={{
                              fontSize: '10px',
                            }}
                          ></FiberManualRecord>{' '}
                          {typeIngredients.length}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          p: 0,
                          overflow: 'visible',
                        }}
                      >
                        <Grid container spacing={2}>
                          {typeIngredients.map((ingredient, i) => (
                            <Grid item xs={6} key={i}>
                              <Primary_Smaller_Card ingredient={ingredient} />
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  )
                )}
              </Box>
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
                <Box sx={{ bgcolor: 'transparent' }}>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                  >
                    <StyledTab label="Nguyên liệu của tôi" />
                    <StyledTab label="Ý tưởng công thức" />
                  </StyledTabs>

                  <CustomTabPanel value={value} index={0}>
                    <Box
                      sx={{
                        backgroundColor: 'transparent',
                        color: 'black',
                        padding: 5,
                        borderRadius: 10,
                        border: 1,
                        borderColor: 'gray',
                        height: '680px',
                        overflow: 'auto',
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                          display: 'none',
                        },
                      }}
                    >
                      <Autocomplete
                        id="filter-demo"
                        options={ingredient}
                        getOptionLabel={(option) => option.name}
                        filterOptions={filterOptions}
                        sx={{ width: '100%', mb: 5 }}
                        onChange={handleAutoCompleteChange}
                        onInputChange={handleInputChange}
                        value={selectedIngredient}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Rồi kiếm cái gì thì nói, nhanh!"
                          />
                        )}
                      />
                      <Ingredient_Component ingredients={filteredIngredients} />
                    </Box>
                  </CustomTabPanel>

                  <CustomTabPanel value={value} index={1}>
                    <Box
                      sx={{
                        backgroundColor: 'transparent',
                        color: 'black',
                        padding: 3,
                        borderRadius: 4,
                        border: 1,
                        borderColor: 'gray',
                      }}
                    >
                      <Typography variant="h6">
                        Content for Nguyên liệu của tôi goes here.
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
