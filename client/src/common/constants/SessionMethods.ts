import { SessionKeys } from "./SessionKeys";

/**
 * Gets the username from the document cookie
 *
 * @param document_ - The document we are grabbing the cookie string from
 * @returns The cookie or an empty string if no cookie exists
 */
const getUsername = (document_: Document): string => {
    if (document_ === undefined) {
        return "";
    }
    const cookieString = document_.cookie;
    const splitCookieString = cookieString.split(
        `; ${SessionKeys.USERNAME_KEY}=`,
    );
    if (splitCookieString.length === 1) {
        return "";
    }
    return splitCookieString[1];
};

/**
 * Gets the session cookie string from the document cookie
 *
 * @param document_ - The document we are grabbing the cookie string from
 * @returns The cookie or an empty string if no cookie exists
 */
const getSessionHash = (document_: Document): string => {
    if (document_ === undefined) {
        return "";
    }
    const cookieString = document_.cookie;
    const splitCookieString = cookieString.split(
        `; ${SessionKeys.USERNAME_KEY}=`,
    );
    if (splitCookieString.length === 1) {
        return "";
    }
    return splitCookieString[0];
};

export { getSessionHash, getUsername };
