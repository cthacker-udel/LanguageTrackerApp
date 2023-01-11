/* eslint-disable no-confusing-arrow -- disabled */

/**
 * Checks if the date supplied is above the minimum date value allowed
 *
 * @param min - The minimum time value
 * @param dateValue - The actual date value
 * @param inclusive - Whether or not to include the min value in the range
 * @returns Whether or not the date value is below or equal to the min
 */
const isDateAboveMin = (
    min: number,
    dateValue: Date,
    inclusive = true,
): boolean =>
    inclusive ? dateValue.getTime() >= min : dateValue.getTime() > min;

/**
 * Checks if the date supplied is above the maximum date value allowed
 *
 * @param max - The maximum time value
 * @param dateValue - The actual date value
 * @param inclusive - Whether or not to include the max value in the range
 * @returns Whether or not the date value is below or equal to the max
 */
const isDateBelowMax = (
    max: number,
    dateValue: Date,
    inclusive = true,
): boolean =>
    inclusive ? dateValue.getTime() <= max : dateValue.getTime() < max;

/**
 * Checks if the date value supplied to the function is in range of both the min and the max value
 *
 * @param min - The minimum time value
 * @param max - The maximum time value
 * @param dateValue - The current date value
 * @param inclusiveMin - Whether or not to include the minimum value
 * @param inclusiveMax - Whether or not to include the maximum value
 * @returns Whether or not the current date value is in range of the min and the max value
 */
const isDateInRange = (
    min: number,
    max: number,
    dateValue: Date,
    inclusiveMin = true,
    inclusiveMax = true,
): { inMin: boolean; inMax: boolean; inRange: boolean } => {
    const inMin = isDateAboveMin(min, dateValue, inclusiveMin);
    const inMax = isDateBelowMax(max, dateValue, inclusiveMax);
    const inRange = inMin && inMax;
    return { inMax, inMin, inRange };
};

export { isDateAboveMin, isDateBelowMax, isDateInRange };
