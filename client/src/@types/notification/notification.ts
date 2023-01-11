/* eslint-disable @typescript-eslint/indent -- disabled */

export type Notification = {
    title: string;
    message: string;
    timeout?: number;
    variant:
        | "danger"
        | "dark"
        | "info"
        | "light"
        | "primary"
        | "secondary"
        | "success"
        | "warning";
};
