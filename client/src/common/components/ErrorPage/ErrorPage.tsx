import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { TextConstants } from "../../constants";
import styles from "./ErrorPage.module.css";
import spacemanGif from "./spaceman.gif";

/**
 * The error page that displays if the user navigates to an unknown page
 *
 * @returns The error page
 */
export const ErrorPage = (): JSX.Element => {
    const navigate = useNavigate();

    const [isRickRolling, setIsRickRolling] = React.useState<boolean>(
        Math.floor(Math.random() * 10) === 7,
    );

    React.useEffect(() => {
        const mainLayout: HTMLDivElement | null =
            document.querySelector("#main_layout");
        if (mainLayout !== null) {
            mainLayout.style.backgroundImage = `url(${spacemanGif})`;
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

    return (
        <div className={styles.error_container}>
            <div className={styles.error_title}>
                {TextConstants.ERROR_PAGE.TITLE}
            </div>
            <div className={styles.error_subtitle}>
                {TextConstants.ERROR_PAGE.SUBTITLE}
            </div>
            <div className={styles.error_button_bar}>
                <Button
                    onClick={(): void => {
                        if (isRickRolling) {
                            window.open(
                                "https://shattereddisk.github.io/rickroll/rickroll.mp4",
                                "_blank",
                            );
                            setIsRickRolling(false);
                        } else {
                            navigate(-1);
                        }
                    }}
                    variant="dark"
                >
                    {TextConstants.ERROR_PAGE.BUTTON_1}
                </Button>
                <Button
                    onClick={(): void => {
                        navigate("/");
                    }}
                    variant="dark"
                >
                    {TextConstants.ERROR_PAGE.BUTTON_2}
                </Button>
            </div>
        </div>
    );
};
