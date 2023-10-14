import { Unit } from "@/components/ui/collections/IngredientSelector/types";

/**
 * Represents the available serving size options for a recipe.
 *
 * @type {number[]} An array of numbers representing the serving size options.
 */
export const SERVING_SIZES: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
];

/**
 * Represents the default unit option.
 */
export const DEFAULT_UNIT_OPTION: Unit = {
  /**
   * The unique identifier of the unit option.
   */
  id: 1,
  /**
   * The name of the unit option.
   */
  name: "--",
};

/**
 * Represents the available unit options for ingredient measurement.
 * Only "g" (grams) and "ml" (milliliters) are supported.
 *
 * @type {Unit[]} An array of objects representing the unit options.
 */
export const UNIT_OPTIONS: Unit[] = [
  DEFAULT_UNIT_OPTION,
  {
    id: 2,
    name: "g",
  },
  {
    id: 3,
    name: "ml",
  },
];
