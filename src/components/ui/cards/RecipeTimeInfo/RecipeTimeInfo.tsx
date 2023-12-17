import { Grid } from '@mui/material';
import { FC } from 'react';
import SimpleContainer from '../../container/SimpleContainer';
import RecipeTimeInfoItem from './RecipeTimeInfoItem';

export type RecipeTimeInfoProps = {
    totalTime: number;
};

const RecipeTimeInfo: FC<RecipeTimeInfoProps> = ({ totalTime }) => {
    return (
        <SimpleContainer>
            <Grid container>
                <Grid
                    item
                    xs
                    textAlign={'center'}
                >
                    <RecipeTimeInfoItem
                        time={totalTime}
                        type="total"
                    />
                </Grid>
            </Grid>
        </SimpleContainer>
    );
};

export default RecipeTimeInfo;
