import SlideInDialog from '@/components/common/dialog/SlideInDialog';
import AppContext from '@/lib/contexts/AppContext';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import CookbookService from '@/lib/services/cookbookService';
import { AddRounded } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';

function AddNewCookBook({
  handleChangeCookbook,
}: {
  handleChangeCookbook: (type: 'add', cookbook: CookBookEntity) => void;
}) {
  const [open, setOpen] = useState(false);
  const [cookbookName, setCookbookName] = useState('');
  const [snackbarAlert] = useSnackbarService();

  const { login, handleSpinner } = useContext(AppContext);

  return (
    <>
      <Box
        component={'div'}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1/1',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 3,
            borderColor: 'grey.400',
            backgroundColor: 'grey.200',
          }}
        >
          <AddRounded
            fontSize="large"
            sx={{
              color: 'grey.400',
            }}
          />
        </Box>

        <Typography
          variant="body2"
          fontWeight={'bold'}
          sx={{
            width: '100%',
            textAlign: 'center',
            py: 0.5,
            opacity: 0,
          }}
          whiteSpace={'nowrap'}
          textOverflow={'ellipsis'}
          overflow={'hidden'}
        >
          Thêm
        </Typography>
      </Box>

      {/* Dialog Thêm */}
      <SlideInDialog
        open={open}
        handleClose={() => setOpen(false)}
        title="Tạo bộ sưu tập mới"
        content={
          <TextField
            sx={{ width: '100%' }}
            placeholder="Tên bộ sưu tập"
            variant="outlined"
            value={cookbookName}
            onChange={(event) => {
              setCookbookName(event.target.value);
            }}
            InputProps={{
              sx: {
                borderRadius: 4,
              },
            }}
          />
        }
        cancelText="Hủy"
        confirmText="Thêm"
        confirmButtonProps={{
          color: 'primary',
        }}
        cancelButtonProps={{
          color: 'primary',
        }}
        onClickConfirm={async () => {
          if (!login.user || !login.user.uid) {
            snackbarAlert('Vui lòng đăng nhập lại', 'error');
            return;
          }
          if (cookbookName == '') {
            snackbarAlert('Vui lòng điền tên cho bộ sưu tập', 'error');
            return;
          }
          handleSpinner(true);
          const result = await CookbookService.AddCookBook({
            name: cookbookName,
            owner: login.user.uid,
          });
          if (result) {
            handleChangeCookbook('add', result);
            console.log(result);

            snackbarAlert('Thêm bộ sưu tập thành công', 'success');
          } else {
            snackbarAlert('Thêm thất bại', 'error');
          }
          handleSpinner(false);
          setCookbookName('');
        }}
      />
    </>
  );
}

export default AddNewCookBook;
