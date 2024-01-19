import { DateDisplay } from '@/pages/MealPlanner';
import {
  Box,
  Button,
  CardActionArea,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import CustomCard from '@/components/common/card/CustomCard';
import ImageRecipe from '@/components/common/card/ImageRecipe';
import TotalTimeRecipe from '@/components/common/card/TotalTimeRecipe';
import AvatarRecipe from '@/components/common/card/AvatarRecipe';
import NameRecipe from '@/components/common/card/NameRecipe';

const imgHeight = '84px';
const padding = 1.4;

function RecommendCalorieStep1({
  weekDates,
  tabValue,
  setTabValue,
  displayData,
  handleNext,
}: {
  weekDates: DateDisplay[];
  tabValue: Date;
  setTabValue: (value: Date) => void;
  displayData: DateDisplay;
  handleNext: () => void;
}) {
  return (
    <Stack direction={'column'} gap={2}>
      <Tabs
        value={tabValue}
        onChange={(_e, newValue) => {
          setTabValue(newValue);
        }}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          '& .MuiTab-root.Mui-selected': {
            color: 'white',
            bgcolor: 'primary.main',
            borderRadius: '100px',
          },
          '& .MuiTab-root': {
            borderRadius: '100px',
            minHeight: '0px',
            mx: 0.5,
            color: 'primary.main',
            border: 1,
            borderColor: 'primary.main',
          },
        }}
      >
        {weekDates.length > 0 &&
          weekDates.map((item, index) => (
            <Tab
              key={index}
              value={item.date}
              disabled={item.planItems.length == 0}
              label={
                <Typography
                  variant="caption"
                  fontWeight={'bold'}
                  sx={{
                    color: 'inherit',
                  }}
                >
                  {item.label}
                </Typography>
              }
            />
          ))}
      </Tabs>

      <Stack direction={'row'} flexWrap={'wrap'} sx={{ width: '100%' }}>
        {displayData && (
          <>
            {displayData.planItems.length == 0 ? (
              <Box
                sx={{
                  width: '100%',
                  p: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'grey.600',
                  borderRadius: '16px',
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={'bold'}
                  sx={{
                    color: 'white',
                  }}
                >
                  Vui lòng thêm công thức vào ngày ăn
                </Typography>
              </Box>
            ) : (
              displayData.planItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 'calc(100% / 4)',
                    p: 1,
                  }}
                >
                  <CustomCard>
                    <CardActionArea>
                      <ImageRecipe
                        imgHeight={imgHeight}
                        src={item.recipe.image}
                        alt={item.recipe.name}
                        quality={1}
                      />

                      <TotalTimeRecipe
                        imgHeight={imgHeight}
                        padding={padding}
                        totalTime={item.recipe.totalTime}
                      />

                      <AvatarRecipe
                        imgHeight={imgHeight}
                        padding={padding}
                        account={item.recipe.account}
                        quality={1}
                      />
                    </CardActionArea>

                    <Box
                      sx={{
                        p: padding,
                      }}
                    >
                      <NameRecipe name={item.recipe.name} />
                    </Box>
                  </CustomCard>
                </Box>
              ))
            )}
          </>
        )}
      </Stack>

      <Stack direction={'row'}>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={displayData?.planItems.length == 0}
          sx={{
            mt: 1,
            mr: 1,
            fontSize: 'body2.fontSize',
            fontWeight: 'bold',
            boxShadow: 0,
          }}
        >
          Tiếp tục
        </Button>
      </Stack>
    </Stack>
  );
}

export default RecommendCalorieStep1;
