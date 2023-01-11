/**
 * Validates the object given to it, consisting of checking if the # of keys in the object is > 0
 *
 * @param object - The object we are validating
 * @returns whether or not the object is valid
 */
export const validateObject = (object: object | undefined): boolean =>
    object !== undefined && Object.keys(object).length > 0;
