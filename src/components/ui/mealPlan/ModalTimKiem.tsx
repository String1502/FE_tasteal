import { Box } from '@mui/material';
import { CustomModal } from './CustomModal';
import { useSearchRecipe } from '../search/useSearchRecipe';
import { SearchTextField } from '../search/SearchTextField';
import { SearchInfiniteScroll } from '../search/SearchInfiniteScroll';
import CustomCardMealPlan from './CustomCard';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

const viewportItemAmount = 6;

export function ModalTimKiem({
    open,
    handleClose,
    title,
}: {
    open: boolean;
    handleClose: () => void;
    title: string;
}) {
    const {
        recipes,
        resultIds,
        searchButtonClick,
        // filter,
        // handleChangeFilter,
        // tuKhoas,
        // handleChangeTuKhoa,
        loadNext,
    } = useSearchRecipe(viewportItemAmount);
    return (
        <CustomModal
            open={open}
            handleClose={handleClose}
            title={title}
        >
            <Box sx={{ width: '100%', py: 2 }}>
                <SearchTextField
                    searchButtonClick={searchButtonClick}
                    props={{
                        size: 'small',
                    }}
                />
            </Box>

            <SearchInfiniteScroll
                viewportItemAmount={viewportItemAmount}
                loadNext={loadNext}
                resultIds={resultIds}
                recipes={recipes}
            >
                {recipes.map((item, index) => (
                    <>
                        {item && (
                            <Box
                                key={item.id}
                                sx={{
                                    flexBasis: {
                                        xs: '100%',
                                        sm: 'calc(99.2%/2)',
                                        md: 'calc(99.3%/3)',
                                    },
                                    p: 1,
                                    mr:
                                        index != recipes.length - 1
                                            ? 0
                                            : 'auto',
                                }}
                            >
                                <CustomCardMealPlan
                                    recipe={item as RecipeEntity}
                                />
                            </Box>
                        )}
                    </>
                ))}
            </SearchInfiniteScroll>
        </CustomModal>
    );
}
