/* eslint-disable react/jsx-no-useless-fragment -- disabled */
/* eslint-disable no-console -- disabled */
/* eslint-disable sonarjs/no-duplicate-string -- disabled */

import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { TextConstants, validateObject, ValueConstants } from "../../common";
import { ServerSideApi } from "../../common/api";
import { useSession } from "../../hooks";
import loginBackground from "./loginbg.gif";
import styles from "./LoginPage.module.css";

type FormData = {
    username: string;
    password: string;
};

/**
 * The login page, which is just a simple form for the user to login
 *
 * @returns The Login Page component, which houses the logic for logging a user in
 */
export const LoginPage = (): JSX.Element => {
    const { sessionValid, validating } = useSession();
    const navigate = useNavigate();

    const { formState, getValues, register } = useForm<FormData>({
        defaultValues: { password: "", username: "" },
        mode: "all",
        reValidateMode: "onBlur",
    });

    const { errors, dirtyFields, isValid } = formState;

    React.useEffect(() => {
        const mainLayout: HTMLDivElement | null =
            document.querySelector("#main_layout");
        if (mainLayout !== null) {
            mainLayout.style.backgroundImage = `url(${loginBackground})`;
            mainLayout.style.backgroundSize = "cover";
            mainLayout.style.backgroundBlendMode = "lighten";
            mainLayout.style.backgroundColor = "rgba(255, 255, 255, 0.55)";
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
        <div className={styles.login_page_layout}>
            <div className={styles.login_page_title}>
                {TextConstants.LOGIN_PAGE.TITLE}
            </div>
            <Form
                className={styles.login_form}
                onKeyDown={async (
                    event: React.KeyboardEvent<HTMLFormElement>,
                ): Promise<void> => {
                    if (event.key === "Enter" && isValid) {
                        const loggingIn = toast.loading("Logging in...");
                        try {
                            const response = await ServerSideApi.post<Response>(
                                "/user/login",
                                { ...getValues() },
                            );
                            console.log("response =", response);
                            if (response.status === 204) {
                                toast.update(loggingIn, {
                                    autoClose: 8000,
                                    closeButton: true,
                                    isLoading: false,
                                    render: "Logged in!",
                                    type: "success",
                                });
                                navigate("/dashboard");
                            } else {
                                toast.update(loggingIn, {
                                    autoClose: 8000,
                                    closeButton: true,
                                    isLoading: false,
                                    render: "Failed to login.",
                                    type: "error",
                                });
                            }
                        } catch (error: unknown) {
                            console.error(
                                `Failed logging in ${(error as Error)?.stack}`,
                            );
                            toast.update(loggingIn, {
                                autoClose: 8000,
                                closeButton: true,
                                isLoading: false,
                                render: "Server Error Occurred, contact administrator.",
                                type: "error",
                            });
                        }
                    }
                }}
            >
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>
                        {TextConstants.LOGIN_PAGE.USERNAME_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={
                            validateObject(errors.username) &&
                            validateObject(dirtyFields) &&
                            dirtyFields.username
                        }
                        isValid={
                            !errors.username &&
                            validateObject(dirtyFields) &&
                            dirtyFields.username
                        }
                        type="text"
                        {...register("username", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.LOGIN_PAGE.USERNAME
                                        .maxLength,
                                value: ValueConstants.LOGIN_PAGE.USERNAME
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.LOGIN_PAGE.USERNAME
                                        .minLength,
                                value: ValueConstants.LOGIN_PAGE.USERNAME
                                    .minLength,
                            },
                            required: {
                                message:
                                    TextConstants.INVALID.LOGIN_PAGE.USERNAME
                                        .required,
                                value: ValueConstants.LOGIN_PAGE.USERNAME
                                    .required,
                            },
                        })}
                    />
                    {errors.username && dirtyFields.username && (
                        <Form.Control.Feedback type="invalid">
                            {errors.username.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.username && dirtyFields.username && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.LOGIN_PAGE.USERNAME}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                        {TextConstants.LOGIN_PAGE.PASSWORD_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={
                            validateObject(errors.password) &&
                            validateObject(dirtyFields) &&
                            dirtyFields.password
                        }
                        isValid={
                            !errors.password &&
                            validateObject(dirtyFields) &&
                            dirtyFields.password
                        }
                        type="password"
                        {...register("password", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.LOGIN_PAGE.PASSWORD
                                        .maxLength,
                                value: ValueConstants.LOGIN_PAGE.PASSWORD
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.LOGIN_PAGE.PASSWORD
                                        .minLength,
                                value: ValueConstants.LOGIN_PAGE.PASSWORD
                                    .minLength,
                            },
                            required: {
                                message:
                                    TextConstants.INVALID.LOGIN_PAGE.PASSWORD
                                        .required,
                                value: ValueConstants.LOGIN_PAGE.PASSWORD
                                    .required,
                            },
                        })}
                    />
                    {errors.password && dirtyFields.password && (
                        <Form.Control.Feedback type="invalid">
                            {errors.password.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.password && dirtyFields.password && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.LOGIN_PAGE.PASSWORD}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <div className={styles.login_page_button_layout}>
                    <Button
                        disabled={
                            Object.keys(dirtyFields).length < 2 ||
                            Object.keys(errors).length > 0
                        }
                        onClick={async (): Promise<void> => {
                            const loggingIn = toast.loading("Logging in...");
                            try {
                                const response =
                                    await ServerSideApi.post<Response>(
                                        "/user/login",
                                        { ...getValues() },
                                    );
                                if (response.status === 204) {
                                    toast.update(loggingIn, {
                                        autoClose: 8000,
                                        closeButton: true,
                                        isLoading: false,
                                        render: "Logged in!",
                                        type: "success",
                                    });
                                    navigate("/dashboard");
                                } else {
                                    toast.update(loggingIn, {
                                        autoClose: 8000,
                                        closeButton: true,
                                        isLoading: false,
                                        render: "Failed to login.",
                                        type: "error",
                                    });
                                }
                            } catch (error: unknown) {
                                console.error(
                                    `Failed logging in ${
                                        (error as Error)?.stack
                                    }`,
                                );
                                toast.update(loggingIn, {
                                    autoClose: 8000,
                                    closeButton: true,
                                    isLoading: false,
                                    render: "Server Error Occurred, contact administrator.",
                                    type: "error",
                                });
                            }
                        }}
                        variant="primary"
                    >
                        {TextConstants.LOGIN_PAGE.LOGIN_BUTTON}
                    </Button>
                    <Button
                        onClick={(): void => {
                            navigate("/signup");
                        }}
                        type="button"
                        variant="secondary"
                    >
                        {TextConstants.LOGIN_PAGE.SIGN_UP_BUTTON}
                    </Button>
                </div>
            </Form>
        </div>
    );
};
