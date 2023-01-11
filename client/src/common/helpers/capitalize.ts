/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable no-confusing-arrow -- disabled */
/**
 * Capitalizes the string passed into it
 *
 * @param theStr - The str we are capitalizing
 * @returns The capitalized string
 */
export const capitalize = (theString: string | undefined): string =>
    theString !== undefined && theString.length > 0
        ? `${theString.slice(0, 1).toLocaleUpperCase()}${theString
              .slice(1)
              .toLowerCase()}`
        : "";
