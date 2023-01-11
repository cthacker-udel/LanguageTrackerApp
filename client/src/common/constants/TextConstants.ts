/**
 * The text constants that encompass this entire application, contains validation text,
 * along with general text that is displayed
 */
export const TextConstants = {
    ERROR_PAGE: {
        BUTTON_1: "Back",
        BUTTON_2: "Home Page",
        SUBTITLE:
            "Trace back your steps! Just kidding, press the back button located below, or go back to the home page. Your choice, either option is risky. Leaving this page may or may not make me angry.",
        TITLE: "Lost?",
    },
    HOME_PAGE: {
        DESCRIPTION:
            "The Language Tracker Application. Is a creation of my habit, which is I would constantly practice programming problems on various websites, and practice every language I was familiar with, that includes languages such as Python, C, C++, C#, and Java to name a few. This is a daily routine, always making sure I at-least practice a problem once a day, or at the very least once in 2 days. This application seeks to organize that activity, and create a dashboard to house and track my practicing, and give me statistics or any sort of visualization of my journey from 0, to hero. I hope I can create an application that not only suits my purposes, but also yours. This application will not use the help of any other UI libraries, will be solely, and completely in-house made. Using React to pull data from the database, and manage states.",
        LOGIN_BUTTON: "Login",
        SIGN_UP_BUTTON: "Sign Up",
        TITLE: "Welcome to the Language Tracker Application!",
    },
    INVALID: {
        LOGIN_PAGE: {
            PASSWORD: {
                maxLength: "Password cannot be more than 35 characters",
                minLength: "Password must be at least 7 characters",
                required: "Password is required",
            },
            USERNAME: {
                maxLength: "Username cannot be more than 35 characters",
                minLength: "Username must be at least 7 characters",
                required: "Username is required",
            },
        },
        PROGRAMMINGLANGUAGEMODAL: {
            DATE: {
                max: "Activity Date cannot be more than 1 year in the future",
                min: "Activity Date cannot be less than 1 year ago",
                required: "Activity Date is required",
            },
            DESCRIPTION: {
                maxLength: "Description cannot be more than 150 characters",
                minLength: "Description must contain at least 25 characters",
                required: "Description is required",
            },
            LANGUAGE: {
                required: "Language is required",
            },
            LEVEL: {
                required: "Level is required",
            },
            LINK: {
                maxLength: "Link cannot be more than 200 characters",
                minLength: "Link must be contain at least 1 character",
            },
            TITLE: {
                maxLength: "Title cannot be more than 75 characters",
                minLength: "Title must contain at least 5 characters",
                required: "Title is required",
            },
            TOTALTIME: {
                max: "Total time must be ≤ 99999",
                min: "Total time must be ≥ 1",
                required: "Total time is required",
            },
            TOTALTIMEMEASUREMENT: {
                required: "Total time measurement is required",
            },
        },
        SIGN_UP_PAGE: {
            EMAIL: {
                maxLength: "Email cannot be more than 100 characters long",
                minLength: "Email must be at least 1 character long",
            },
            FIRST_NAME: {
                maxLength: "First Name cannot be more than 35 characters long",
                minLength: "First Name must be at least 1 character long",
            },
            LAST_NAME: {
                maxLength: "Last Name cannot be more than 35 characters long",
                minLength: "Last Name must be at least 1 character long",
            },
            PASSWORD: {
                maxLength: "Password cannot be more than 35 characters long",
                minLength: "Password must be at least 7 characters long",
                required: "Password is required",
            },
            USERNAME: {
                maxLength: "Username cannot be more than 35 characters long",
                minLength: "Username must be at least 7 characters long",
                required: "Username is required",
            },
        },
    },
    LOGIN_PAGE: {
        LOGIN_BUTTON: "Login",
        PASSWORD_LABEL: "Password",
        SIGN_UP_BUTTON: "Sign Up",
        TITLE: "Login Page",
        USERNAME_LABEL: "Username",
    },
    SIGN_UP_PAGE: {
        BACK_TO_LOGIN_BUTTON: "Back to Login",
        DOB_LABEL: "Date of Birth",
        EMAIL_LABEL: "Email",
        FIRST_NAME_LABEL: "First Name",
        LAST_NAME_LABEL: "Last Name",
        PASSWORD_LABEL: "Password",
        SIGN_UP_BUTTON: "Sign Up",
        TITLE: "Sign Up",
        USERNAME_LABEL: "Username",
    },
    VALID: {
        LOGIN_PAGE: {
            PASSWORD: "Password is valid!",
            USERNAME: "Username is valid!",
        },
        PROGRAMMINGLANGUAGEMODAL: {
            DATE: "Activity Date is valid!",
            DESCRIPTION: "Description is valid!",
            LANGUAGE: "Language is valid!",
            LEVEL: "Level is valid!",
            LINK: "Link is valid!",
            TITLE: "Title is valid!",
            TOTALTIME: "Total Time is valid!",
            TOTALTIMEMEASUREMENT: "Total Time Measurement is valid!",
            TYPE: "Activity Type is valid!",
        },
        SIGN_UP_PAGE: {
            EMAIL: "Email is valid!",
            FIRST_NAME: "First Name is valid!",
            LAST_NAME: "Last Name is valid!",
            PASSWORD: "Password is valid!",
            USERNAME: "Username is valid!",
        },
    },
};
