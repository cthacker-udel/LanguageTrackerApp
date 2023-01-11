/* eslint-disable react/jsx-no-useless-fragment -- disabled */
import React from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

import { TextConstants } from "../../common/constants";
import { useSession } from "../../hooks";
import styles from "./HomePage.module.css";
import skyBackground from "./skybg1.gif";

/**
 *
 * @returns The Home Page of the application
 */
export const HomePage = (): JSX.Element => {
    const { sessionValid, validating } = useSession();
    const navigator = useNavigate();

    React.useEffect(() => {
        const mainLayout: HTMLDivElement | null =
            document.querySelector("#main_layout");

        if (mainLayout !== null) {
            mainLayout.style.backgroundImage = `url(${skyBackground})`;
            mainLayout.style.backgroundSize = "cover";
            mainLayout.style.backgroundBlendMode = "lighten";
            mainLayout.style.backgroundColor = "rgba(255, 255, 255, 0.33)";
        }

        return () => {
            if (mainLayout !== null) {
                mainLayout.style.backgroundImage = "";
                mainLayout.style.backgroundSize = "";
                mainLayout.style.backgroundBlendMode = "";
                mainLayout.style.backgroundColor = "";
            }
        };
    }, []);

    if (validating) {
        return <></>;
    }

    if (sessionValid) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className={styles.home_page_layout}>
            <div className={styles.home_page_title}>
                {TextConstants.HOME_PAGE.TITLE}
            </div>
            <div className={styles.home_page_content}>
                {TextConstants.HOME_PAGE.DESCRIPTION}
            </div>
            <div className={styles.home_page_button_layout}>
                <Button
                    className={styles.home_page_login_button}
                    onClick={(): void => {
                        navigator("/login");
                    }}
                    type="button"
                    variant="primary"
                >
                    {TextConstants.HOME_PAGE.LOGIN_BUTTON}
                </Button>
                <Button
                    className={styles.home_page_sign_up_button}
                    onClick={(): void => {
                        navigator("/signup");
                    }}
                    type="button"
                    variant="secondary"
                >
                    {TextConstants.HOME_PAGE.SIGN_UP_BUTTON}
                </Button>
            </div>
        </div>
    );
};
