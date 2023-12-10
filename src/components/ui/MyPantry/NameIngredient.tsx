import {IngredientEntity} from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Typography } from '@mui/material';

function NameIngredient({ name }: { name: IngredientEntity['name'] }) {
    return (
        <Typography
            variant="body2"
            sx={{ fontWeight: 'bold',  textAlign: 'center', 
            justifyContent: 'center', alignItems: 'center' }}//Hai nhỏ này không xài được
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}

        >
            {name}
        </Typography>
    );
}

export default NameIngredient;
