/* eslint-disable no-console -- disabled */
/* eslint-disable @typescript-eslint/no-extraneous-class -- disabled */
import { configuration, localConfiguration } from "../../config";

/**
 * This is a Server-Side API wrapper class
 */
export class ServerSideApi {
    protected static BASE_URL = "http://localhost:3001/api";

    /**
     * Constructs an instance of the server side api
     *
     * @param enabledLocal - Enable local configuration
     */
    public constructor(enabledLocal = true) {
        ServerSideApi.BASE_URL = enabledLocal
            ? localConfiguration.SERVER_BASE_URL
            : configuration.SERVER_BASE_URL;
    }

    /**
     * Constructs a post request to send to the server side
     *
     * @param url - The url to post to
     * @param headers - The headers for the post request
     * @param body - The body for the post request
     * @returns The result of the post request
     */
    public static post = async <T>(
        url: string,
        body?: { [key: string]: unknown },
        headers: { [key: string]: string } = {},
    ): Promise<T> => {
        // eslint-disable-next-line no-param-reassign -- disabled
        headers = {
            "Content-Type": "application/json; charset=UTF-8",
            ...headers,
        };
        try {
            const response: Response = await fetch(
                `${ServerSideApi.BASE_URL}${url}`,
                {
                    body: JSON.stringify(body ?? {}),
                    credentials: "include",
                    headers,
                    method: "POST",
                },
            );
            return response.status === 204 ? response : await response.json();
        } catch (error: unknown) {
            console.error(`POST ERROR = ${(error as Error).stack}`);
            throw error;
        }
    };
}
