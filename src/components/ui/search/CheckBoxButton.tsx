import { Button, Checkbox, Typography } from '@mui/material';
import { TuKhoa } from '../../../pages/Search';

const sx = {
    borderRadius: '40px',
    height: '35px',
    border: 1,
    borderColor: 'primary.main',
};

const CustomButton = ({
    label,
    variant,
    color,
}: {
    label: string;
    variant: any;
    color?: string;
}) => {
    return (
        <Button
            sx={sx}
            variant={variant}
        >
            <Typography
                variant="body2"
                color={color ?? 'primary'}
                sx={{ fontWeight: 'bold', textTransform: 'lowercase' }}
            >
                # {label}
            </Typography>
        </Button>
    );
};

export function CheckBoxButton({
    item,
    handleChangeTuKhoa,
}: {
    item: TuKhoa;
    handleChangeTuKhoa: (tukhoa: TuKhoa) => void;
}) {
    return (
        <>
            <Checkbox
                checked={item.value}
                onChange={(e) => {
                    handleChangeTuKhoa({
                        ...item,
                        value: e.target.checked,
                    });
                }}
                icon={
                    <CustomButton
                        label={item.keyword}
                        variant="outlined"
                    />
                }
                checkedIcon={
                    <CustomButton
                        label={item.keyword}
                        variant="contained"
                        color="white"
                    />
                }
                disableRipple
            />
        </>
    );
}
