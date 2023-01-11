/* eslint-disable react/jsx-no-useless-fragment -- disabled */
/* eslint-disable no-console -- disabled */
/* eslint-disable sonarjs/no-duplicate-string -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { TextConstants, ValueConstants } from "../../common";
import { ServerSideApi } from "../../common/api";
import { useSession } from "../../hooks";
import signUpBackground from "./signupbg.gif";
import styles from "./SignUpPage.module.css";

type FormData = {
    dob: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
};

/**
 * The Sign-Up form, consists of data the user can populate in their profile
 */
export const SignUp = (): JSX.Element => {
    const { sessionValid, validating } = useSession();
    const navigate = useNavigate();
    const { formState, register, getValues } = useForm<FormData>({
        defaultValues: {
            dob: new Date().toDateString(),
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            username: "",
        },
        mode: "all",
        reValidateMode: "onBlur",
    });

    const { errors, dirtyFields, isValid, isValidating, touchedFields } =
        formState;

    React.useEffect(() => {
        const mainLayout: HTMLDivElement | null =
            document.querySelector("#main_layout");

        if (mainLayout !== null) {
            mainLayout.style.backgroundImage = `url(${signUpBackground})`;
            mainLayout.style.backgroundSize = "contain";
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

    const signUp = React.useCallback(
        async (signUpValues: FormData) => {
            const signingUp = toast.loading("Signing up...");
            const pushedValues: { [key: string]: Date | string } = {};
            const allValues: { [key: string]: Date | string } = signUpValues;
            for (const eachDirtyField of Object.keys(dirtyFields)) {
                pushedValues[eachDirtyField] = allValues[eachDirtyField];
            }
            try {
                const result = await ServerSideApi.post<Response>(
                    "/user/addUser",
                    {
                        ...pushedValues,
                    },
                );
                if (result.status === 204) {
                    toast.update(signingUp, {
                        autoClose: 8000,
                        closeButton: true,
                        isLoading: false,
                        render: "Signed up successfully!",
                        type: "success",
                    });
                    navigate("/login");
                } else {
                    toast.update(signingUp, {
                        autoClose: 8000,
                        closeButton: true,
                        isLoading: false,
                        render: "Failed to Sign Up.",
                        type: "error",
                    });
                }
            } catch (error: unknown) {
                console.error(`Failed signing up ${(error as Error)?.stack}`);
                toast.update(signingUp, {
                    autoClose: 8000,
                    closeButton: true,
                    isLoading: false,
                    render: "Failed to Sign Up.",
                    type: "error",
                });
            }
        },
        [dirtyFields, navigate],
    );

    if (validating) {
        return <></>;
    }

    if (sessionValid) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className={styles.sign_up_page_layout}>
            <div className={styles.sign_up_page_title}>
                {TextConstants.SIGN_UP_PAGE.TITLE}
            </div>
            <Form
                className={styles.sign_up_page_form}
                onKeyDown={async (
                    event: React.KeyboardEvent<HTMLFormElement>,
                ): Promise<void> => {
                    if (event.key === "Enter" && isValid) {
                        const signUpValues = getValues();
                        const signingUp = toast.loading("Signing up...");
                        const pushedValues: { [key: string]: Date | string } =
                            {};
                        const allValues: { [key: string]: Date | string } =
                            signUpValues;
                        for (const eachDirtyField of Object.keys(dirtyFields)) {
                            pushedValues[eachDirtyField] =
                                allValues[eachDirtyField];
                        }
                        try {
                            const result = await ServerSideApi.post<Response>(
                                "/user/addUser",
                                {
                                    ...pushedValues,
                                },
                            );
                            if (result.status === 204) {
                                toast.update(signingUp, {
                                    autoClose: 8000,
                                    closeButton: true,
                                    isLoading: false,
                                    render: "Signed up successfully!",
                                    type: "success",
                                });
                                navigate("/login");
                            } else {
                                toast.update(signingUp, {
                                    autoClose: 8000,
                                    closeButton: true,
                                    isLoading: false,
                                    render: "Failed to Sign Up.",
                                    type: "error",
                                });
                            }
                        } catch (error: unknown) {
                            console.error(
                                `Failed signing up ${(error as Error)?.stack}`,
                            );
                            toast.update(signingUp, {
                                autoClose: 8000,
                                closeButton: true,
                                isLoading: false,
                                render: "Failed to Sign Up.",
                                type: "error",
                            });
                        }
                    }
                }}
            >
                <Form.Group controlId="sign_up_first_name">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.FIRST_NAME_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={
                            errors.firstName &&
                            dirtyFields.firstName !== undefined
                        }
                        isValid={
                            !errors.firstName &&
                            dirtyFields.firstName !== undefined
                        }
                        {...register("firstName", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.LAST_NAME
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.LAST_NAME
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE
                                        .FIRST_NAME.minLength,
                                value: ValueConstants.SIGN_UP_PAGE.FIRST_NAME
                                    .minLength,
                            },
                        })}
                    />
                    {errors.firstName && dirtyFields.firstName && (
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.firstName && dirtyFields.firstName && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.SIGN_UP_PAGE.FIRST_NAME}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="sign_up_last_name">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.LAST_NAME_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={errors.lastName && dirtyFields.lastName}
                        {...register("lastName", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.LAST_NAME
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.LAST_NAME
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.LAST_NAME
                                        .minLength,
                                value: ValueConstants.SIGN_UP_PAGE.LAST_NAME
                                    .minLength,
                            },
                        })}
                    />
                    {errors.lastName && dirtyFields.lastName && (
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.lastName && dirtyFields.lastName && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.SIGN_UP_PAGE.LAST_NAME}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="sign_up_page_email">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.EMAIL_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={errors.email && dirtyFields.email}
                        isValid={!errors.email && dirtyFields.email}
                        {...register("email", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.EMAIL
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.EMAIL
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.EMAIL
                                        .minLength,
                                value: ValueConstants.SIGN_UP_PAGE.EMAIL
                                    .minLength,
                            },
                        })}
                    />
                    {errors.email && dirtyFields.email && (
                        <Form.Control.Feedback type="invalid">
                            {errors.email.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.email && dirtyFields.email && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.SIGN_UP_PAGE.EMAIL}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="signUpPageUsername">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.USERNAME_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={errors.username && touchedFields.username}
                        isValid={!errors.username && touchedFields.username}
                        {...register("username", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.USERNAME
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.USERNAME
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.USERNAME
                                        .minLength,
                                value: ValueConstants.SIGN_UP_PAGE.USERNAME
                                    .minLength,
                            },
                            required: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.USERNAME
                                        .required,
                                value: ValueConstants.SIGN_UP_PAGE.USERNAME
                                    .required,
                            },
                        })}
                    />
                    {errors.username &&
                        (touchedFields.username || dirtyFields.username) && (
                            <Form.Control.Feedback type="invalid">
                                {errors.username.message}
                            </Form.Control.Feedback>
                        )}
                    {!errors.username && dirtyFields.username && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.SIGN_UP_PAGE.USERNAME}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="signUpPagePassword">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.PASSWORD_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={errors.password && touchedFields.password}
                        isValid={!errors.password && touchedFields.password}
                        {...register("password", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.PASSWORD
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.PASSWORD
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.PASSWORD
                                        .minLength,
                                value: ValueConstants.SIGN_UP_PAGE.PASSWORD
                                    .minLength,
                            },
                            required: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.PASSWORD
                                        .required,
                                value: ValueConstants.SIGN_UP_PAGE.PASSWORD
                                    .required,
                            },
                        })}
                    />
                    {errors.password &&
                        (touchedFields.password || dirtyFields.password) && (
                            <Form.Control.Feedback type="invalid">
                                {errors.password.message}
                            </Form.Control.Feedback>
                        )}
                    {!errors.password && dirtyFields.password && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.SIGN_UP_PAGE.PASSWORD}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <div className={`${styles.sign_up_page_button_bar}`}>
                    <Button
                        disabled={
                            !isValid ||
                            isValidating ||
                            !dirtyFields.password ||
                            !dirtyFields.username
                        }
                        onClick={async (): Promise<void> => {
                            await signUp(getValues());
                        }}
                        variant={
                            !isValid ||
                            isValidating ||
                            !dirtyFields.password ||
                            !dirtyFields.username
                                ? "secondary"
                                : "success"
                        }
                    >
                        {TextConstants.SIGN_UP_PAGE.SIGN_UP_BUTTON}
                    </Button>
                    <Button
                        onClick={(): void => {
                            navigate("/login");
                        }}
                        variant="primary"
                    >
                        {TextConstants.SIGN_UP_PAGE.BACK_TO_LOGIN_BUTTON}
                    </Button>
                </div>
            </Form>
        </div>
    );
};
