/* eslint-disable no-console -- disabled */
/* eslint-disable unicorn/no-document-cookie -- disabled */
import React from "react";

import { ServerSideApi } from "../../common";

type useSessionReturn = {
    validating: boolean;
    sessionValid: boolean;
};

/**
 * A custom hook to validate the user session and have an optional direct navigation if the user wishes
 * if the session is invalid, or propagate that result up to the caller
 *
 * @param document - The document instance we are passing into the session
 */
const useSession = (): useSessionReturn => {
    const [validating, setValidating] = React.useState(true);
    const [sessionValid, setSessionValid] = React.useState<boolean>(true);

    React.useLayoutEffect(() => {
        console.log("running effect");
        ServerSideApi.post<Response>("/user/validateSession")
            .then((response: Response) => {
                if (response.status === 204) {
                    setSessionValid(true);
                } else {
                    setSessionValid(false);
                }
                setValidating(false);
            })
            .catch((error: unknown) => {
                setValidating(false);
                setSessionValid(false);
                console.error(
                    `Failed validating session ${(error as Error)?.stack}`,
                );
            });
    }, []);

    return {
        sessionValid,
        validating,
    };
};

export { type useSessionReturn, useSession };
