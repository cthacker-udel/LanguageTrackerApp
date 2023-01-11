import type { Notification } from "./notification";

export type NotificationContextInterface = {
    addNotification: (_notification: Notification) => void;
    removeNotification: (_index: number) => void;
    notifications: Notification[];
};
