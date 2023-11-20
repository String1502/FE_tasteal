import { IngredientItemData } from ".";

/**
 * Props for the IngredientItem component.
 */
type IngredientItemProps = {
  /**
   * The data for the ingredient item.
   */
  item: IngredientItemData;

  /**
   * Callback function called when the item is deleted.
   * @param id - The ID of the item to delete.
   */
  onDelete: (id: string) => void;

  /**
   * Whether the item is disabled.
   */
  disabled: boolean;
};

export default IngredientItemProps;
