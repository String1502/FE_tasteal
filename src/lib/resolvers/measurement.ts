import { MeasurementUnit } from "../enums/measurement";

/**
 * Resolve the correct measurement unit label
 *
 * @param {boolean} isLiquid - Indicate if the ingredient is liquid.
 * @returns {string} The label for the correct measurement unit.
 */
export function MeasurementUnitResolver(isLiquid: boolean | undefined) {
  if (!isLiquid) {
    return MeasurementUnit.none;
  }

  return isLiquid ? MeasurementUnit.liquid : MeasurementUnit.dry;
}
