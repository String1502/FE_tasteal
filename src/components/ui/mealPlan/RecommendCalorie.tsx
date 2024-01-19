import {
  Box,
  Button,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material';
import weightScale from '../../../assets/weightScale.png';
import { CustomDialog } from '@/components/common/dialog/CustomDialog';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DateDisplay, compareTwoDates } from '@/pages/MealPlanner';

import RecommendCalorieStep1 from './RecommendCalorieStep1';
import RecommendCalorieStep2, { DataStep2 } from './RecommendCalorieStep2';
import { RecommendMealPlanRes } from '@/lib/models/dtos/Response/RecommendMealPlanRes/RecommendMealPlanRes';
import ResultRecommendCalorie from './ResultRecommendCalorie';
import PlanItemService from '@/lib/services/planItemService';
import { RecommendMealPlanReq } from '@/lib/models/dtos/Request/RecommendMealPlanReq/RecommendMealPlanReq';
import AppContext from '@/lib/contexts/AppContext';

function RecommendCalorie({ weekDates }: { weekDates: DateDisplay[] }) {
  const [open, setOpen] = useState(false);
  const { handleSpinner } = useContext(AppContext);
  // Stepper
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Step 1
  const [buoc1Value, setBuoc1Value] = useState<Date>(
    weekDates.find((item) => compareTwoDates(item.date, new Date()))?.date ||
      new Date()
  );

  const [displayData, setDisplayData] = useState<DateDisplay | undefined>(
    undefined
  );

  // Step 2
  const [step2Value, setStep2Value] = useState<DataStep2>({
    weight: undefined,
    height: undefined,
    age: undefined,
    gender: undefined,
    rate: undefined,
    intend: undefined,
  });

  const handleChangeStep2Value = (value: DataStep2) => {
    setStep2Value(value);
  };

  useEffect(() => {
    if (weekDates.length > 0) {
      setDisplayData(
        weekDates.find((item) => compareTwoDates(item.date, buoc1Value)) ||
          undefined
      );
    }
  }, [buoc1Value]);

  useEffect(() => {
    if (weekDates.length > 0) {
      setBuoc1Value(
        weekDates.find((item) => compareTwoDates(item.date, new Date()))
          ?.date || new Date()
      );
    }
  }, [weekDates]);

  // Ket qua calo
  const [result, setResult] = useState<RecommendMealPlanRes | undefined>(
    undefined
  );

  const handleResult = async (req: RecommendMealPlanReq) => {
    try {
      handleSpinner(true);
      const data = await PlanItemService.RecommendMealPlan(req);
      setResult(data);
      handleSpinner(false);
    } catch (error) {
      console.log(error);
      handleSpinner(false);
    }
  };

  const steps = useMemo(() => {
    return [
      {
        label: 'Chọn ngày muốn đánh giá',
        content: (
          <RecommendCalorieStep1
            weekDates={weekDates}
            tabValue={buoc1Value}
            setTabValue={(value: Date) => {
              setBuoc1Value(value);
            }}
            displayData={displayData}
            handleNext={handleNext}
          />
        ),
      },
      {
        label: 'Điền thông tin cơ thể',
        content: (
          <RecommendCalorieStep2
            step2Value={step2Value}
            handleChangeStep2Value={handleChangeStep2Value}
            handleBack={handleBack}
            displayData={displayData}
            handleResult={handleResult}
          />
        ),
      },
    ];
  }, [
    buoc1Value,
    step2Value,
    handleChangeStep2Value,
    weekDates,
    displayData,
    handleNext,
    handleBack,
    handleResult,
  ]);

  const reset = () => {
    setActiveStep(0);
    setOpen(false);
    setStep2Value({
      weight: undefined,
      height: undefined,
      age: undefined,
      gender: undefined,
      rate: undefined,
      intend: undefined,
    });
    setResult(undefined);
  };

  return (
    <Box
      sx={{
        aspectRatio: '1/1',
        bgcolor: 'primary.main',
        width: '56px',
        borderRadius: '50%',
        boxShadow: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component={'img'}
        sx={{
          width: '50%',
          aspectRatio: '1/1',
          objectFit: 'contain',
          objectPosition: 'center',
          cursor: 'pointer',
        }}
        src={weightScale}
        onClick={() => setOpen(true)}
      />

      <CustomDialog
        open={open}
        handleClose={() => setOpen(false)}
        title="Đánh giá khẩu phần ăn"
        action={
          <>
            {result && displayData && step2Value && (
              <Stack
                direction={'row'}
                gap={2}
                justifyContent={'flex-end'}
                sx={{
                  width: '100%',
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    px: 4,
                  }}
                  onClick={reset}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    //Hàm cập nhật
                  }}
                >
                  Cập nhật
                </Button>
              </Stack>
            )}
          </>
        }
      >
        {result && displayData && step2Value ? (
          <ResultRecommendCalorie
            result={result}
            displayData={displayData}
            step2Value={step2Value}
          />
        ) : (
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              my: 2,
              width: '100%',
            }}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Box sx={{ width: '100%' }}>{step.content}</Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      </CustomDialog>
    </Box>
  );
}

export default RecommendCalorie;
