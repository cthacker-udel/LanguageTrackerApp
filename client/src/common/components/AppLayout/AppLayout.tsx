import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Layout } from "../Layout";

/**
 * The application layout component, which wraps the outlet within an layout
 *
 * @returns The application layout, which uses an outlet component to properly display the current route page
 */
export const AppLayout = (): JSX.Element => {
    const { state } = useLocation();

    return (
        <Layout>
            <Outlet context={{ ...state }} />
        </Layout>
    );
};
