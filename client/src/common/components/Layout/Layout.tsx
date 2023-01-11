import React, { type ReactNode } from "react";

import styles from "./Layout.module.css";

type LayoutProperties = {
    children: ReactNode;
    childrenOverride?: string;
    mainLayoutOverride?: string;
    topElement?: ReactNode;
    topElementOverride?: string;
};

/**
 * Common layout component, allows for a commonality between layouts of this website, no css rules that are too restricting, and can always be overridden
 *
 * @param props - The properties of the Layout component
 * @param props.children - The children this component wraps
 * @param props.childrenOverride - The css override for the children component
 * @param props.mainLayoutOverride - The css override for the main layout component
 * @param props.topElement - The element we are appending to the top of the layout
 * @param props.topElementOverride - The css override for the top component
 *
 * @returns The common layout component
 */
export const Layout = ({
    children,
    childrenOverride,
    mainLayoutOverride,
    topElement,
    topElementOverride,
}: LayoutProperties): JSX.Element => (
    <div
        className={`${styles.main_layout} ${mainLayoutOverride ?? ""}`}
        id="main_layout"
    >
        {topElement !== undefined && (
            <div
                className={`${styles.top_element_layout} ${
                    topElementOverride ?? ""
                }`}
            >
                {topElement}
            </div>
        )}
        <div
            className={`${styles.children_layout} ${childrenOverride ?? ""}`}
            id="layout_children"
        >
            {children}
        </div>
    </div>
);
