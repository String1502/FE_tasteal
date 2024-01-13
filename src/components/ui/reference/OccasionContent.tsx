import DetailCard from '@/components/common/card/DetailCard';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import { Box, Stack, Typography } from '@mui/material';

function OccasionContent({ occasions }: { occasions: OccasionEntity[] }) {
  return (
    <Stack
      direction={'row'}
      sx={{
        m: -2,
      }}
      flexWrap={'wrap'}
      alignItems={'stretch'}
    >
      {occasions.map((occasion) => (
        <Box
          key={occasion.id}
          sx={{
            p: 2,
            width: 'calc(100%/2)',
            minHeight: '100%',
          }}
        >
          <DetailCard
            occasion={occasion}
            props={{
              sx: {
                height: '100%',
              },
            }}
          >
            <Stack
              direction={'column'}
              sx={{
                width: '100%',
                bgcolor: 'white',
                height: '100%',
                p: 4,
              }}
            >
              <StackText title="Dịp lễ:" content={occasion.name} />

              <StackText
                title="Thời gian:"
                content={
                  occasion.start_at.toLocaleDateString() +
                  ' - ' +
                  occasion.end_at.toLocaleDateString()
                }
              />

              <StackText
                title=""
                content={occasion.is_lunar_date ? 'Âm lịch' : 'Dương lịch'}
              />

              <StackText
                direction="column"
                title="Mô tả:"
                content={occasion.description}
              />
            </Stack>
          </DetailCard>
        </Box>
      ))}
    </Stack>
  );
}

export default OccasionContent;

function StackText({
  title,
  content,
  direction,
}: {
  title: string;
  content: string;
  direction?: 'row' | 'column';
}) {
  return (
    <Stack
      direction={direction ? direction : 'row'}
      justifyContent={'space-between'}
    >
      <Typography variant="body1" fontWeight={'bold'}>
        {title}
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Stack>
  );
}
