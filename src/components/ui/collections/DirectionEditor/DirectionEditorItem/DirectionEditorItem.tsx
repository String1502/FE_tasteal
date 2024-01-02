import TastealTextField from '@/components/common/textFields/TastealTextField';
import FormTitle from '@/components/common/typos/FormTitle';
import useFirebaseImage from '@/lib/hooks/useFirebaseImage';
import { Close, ExpandMore, Photo } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormLabel,
  IconButton,
  Stack,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

type ImageProps = {
  url: string;
  onRemove: () => void;
};

const Image: React.FC<ImageProps> = ({ url = '', onRemove }) => {
  //#region UseStates

  const [isHovered, setIsHovered] = useState(false);

  //#endregion

  //#region Handlers

  const handleRemoveImage = useCallback(() => {
    onRemove && onRemove();
  }, [onRemove]);

  //#endregion
  console.log(url);

  return (
    <Box
      position={'relative'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      display={url !== '' ? 'block' : 'none'}
    >
      <Box
        component="img"
        src={url}
        sx={[
          {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'grey.300',
            boxShadow: 4,
            borderRadius: 4,
            width: 280,
            objectFit: 'contain',
            objectPosition: 'center',
            transition: 'all 0.2s ease-in-out',
          },
          isHovered && {
            cursor: 'pointer',
            borderColor: 'primary.main',
          },
        ]}
      ></Box>
      <IconButton
        sx={[
          {
            position: 'absolute',
            right: 1,
            top: 1,
            '&:hover': {
              rotate: '15deg',
              scale: '1.2',
            },
            transition: 'all 0.2s ease-in-out',
          },
        ]}
        onClick={handleRemoveImage}
      >
        <Close color="primary" fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export type DirectionEditorItemValue = {
  step: number;
  direction: string;
  imageFile?: File | null;
  imagePath?: string;
};

export type DirectionEditorItemProps = {
  value: DirectionEditorItemValue;
  onChange: (value: DirectionEditorItemValue) => void;
  onRemove: () => void;
  disabled: boolean;
};

const DirectionEditorItem: React.FC<DirectionEditorItemProps> = ({
  value,
  onChange,
  onRemove,
  disabled = false,
}) => {
  //#region UseMemos

  const img = useFirebaseImage(value.imagePath ?? '', 100, false);
  const url = useMemo(() => {
    if (value.imageFile) {
      return URL.createObjectURL(value.imageFile);
    }
    if (img) {
      return img;
    }
  }, [img, value.imageFile]);

  //#endregion

  //#region Handlers

  const handleDescriptionChange = useCallback(
    (desc) => {
      onChange({
        ...value,
        direction: desc,
      });
    },
    [onChange, value]
  );

  const handleImageFileChange = useCallback(
    (file: File | null) => {
      onChange({
        ...value,
        imageFile: file,
        imagePath: '',
      });
    },
    [onChange, value]
  );

  //#endregion

  return (
    <Accordion
      sx={{
        border: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />} sx={{}}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <FormLabel>Bước {value.step}</FormLabel>
          <IconButton
            onClick={onRemove}
            sx={value.step === 1 ? { display: 'none' } : {}}
          >
            <Close />
          </IconButton>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: 1,
        }}
      >
        <TastealTextField
          multiline
          placeholder="Mô tả bước"
          rows={3}
          fullWidth
          value={value.direction}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          disabled={disabled}
        />

        <Image url={url} onRemove={() => handleImageFileChange(null)} />

        <Button
          component="label"
          variant="contained"
          startIcon={<Photo />}
          sx={
            value.imageFile && {
              display: 'none',
            }
          }
          disabled={disabled}
        >
          Thêm hình ảnh
          <input
            hidden
            type="file"
            onChange={(e) => handleImageFileChange(e.target.files![0])}
          />
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default DirectionEditorItem;
