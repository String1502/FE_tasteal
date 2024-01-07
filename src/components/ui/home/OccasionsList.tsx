import BoxImage from '@/components/common/image/BoxImage';
import { PageRoute } from '@/lib/constants/common';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function OccasionsList({ occasions }: { occasions: OccasionEntity[] }) {
  return (
    <>
      <Stack
        direction={'row'}
        useFlexGap
        flexWrap="wrap"
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        sx={{
          mx: -1.5,
        }}
      >
        {occasions.map((item, index) => (
          <OccasionCard key={index} item={item} />
        ))}
      </Stack>
    </>
  );
}

export const localOcacions = 'localOccasionSearch';

function OccasionCard({ item }: { item: OccasionEntity }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '50%', md: '33%', lg: '25%' },
        p: 1.5,
      }}
    >
      <Box
        component={Button}
        sx={{
          width: '100%',
          aspectRatio: '1/0.7',
          boxShadow: 1,
          cursor: 'pointer',
          transition: 'all 0.15s ease-in-out',
          overflow: 'hidden',
          borderRadius: 4,
          '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-3px)',
          },
          p: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={() => {
          localStorage.setItem(localOcacions, JSON.stringify(item));
          navigate(PageRoute.Search);
        }}
      >
        <BoxImage
          src={item?.image}
          quality={30}
          sx={{
            width: '100%',
            height: '100%',
          }}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 1.5,
            px: 4,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255,255,255,0.98)',
          }}
        >
          <Typography
            variant="body2"
            fontWeight={900}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            width={'100%'}
            color={'primary'}
          >
            {item.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
