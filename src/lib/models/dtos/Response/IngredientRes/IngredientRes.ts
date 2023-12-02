export type IngredientRes = {
    id: number;
    name: string;
    image?: string;
    amount?: number;
    amount_per_serving: number;
    isLiquid: boolean;
};
