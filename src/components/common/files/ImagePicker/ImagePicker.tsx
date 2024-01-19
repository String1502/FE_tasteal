import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import { PhotoCameraOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { ChangeEventHandler, FC, useCallback, useMemo } from 'react';

export type ImagePickerProps = {
  file: File | null;
  imagePath: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};

export const ImagePicker: FC<ImagePickerProps> = ({
  file,
  imagePath: imagePath,
  onChange,
  disabled = false,
}) => {
  const imageUrl = useFirebaseImage(imagePath, 100, false);

  const previewUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }

    if (imagePath !== '') {
      return imageUrl ? imageUrl : '';
    }

    return '';
  }, [file, imagePath, imageUrl]);

  const hasImage = useMemo(() => Boolean(previewUrl), [previewUrl]);

  const handleFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.target.files?.item(0)) {
        onChange(e.target.files?.item(0));
      }
    },
    [onChange]
  );

  return (
    <label
      htmlFor="image"
      style={{
        width: '240px',
      }}
    >
      <Box
        width="240px"
        height="240px"
        sx={{
          backgroundImage: `url(${previewUrl})`,
          backgroundSize: 'cover',
          backgroundColor: '#ffe6d4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '24px',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'grey.600',
          '&:hover': disabled
            ? {}
            : {
                cursor: 'pointer',
                backgroundColor: '#ffccbb',
              },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <Stack
          alignItems={'center'}
          visibility={hasImage ? 'hidden' : 'visible'}
        >
          <PhotoCameraOutlined htmlColor="#777d86" />
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 1000,
              color: '#777d86',
            }}
          >
            Thêm hình của bạn
          </Typography>
        </Stack>

        <input
          id="image"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={disabled}
          accept="image/*"
        />
      </Box>
    </label>
  );
};
