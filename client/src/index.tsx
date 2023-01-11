/* eslint-disable react/jsx-no-useless-fragment -- disabled */
/* eslint-disable require-await -- disabled */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled for swr cache implementation */
/* eslint-disable jest/require-hook -- disabled */
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";

import { AppLayout, ErrorPage } from "./common";
import { Dashboard, HomePage, LoginPage, SignUp } from "./pages";

const root = ReactDOM.createRoot(
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style -- disabled
    document.querySelector("#root") as HTMLElement,
);

root.render(
    <SWRConfig
        value={{
            fetcher: async (resource, init): Promise<Response> =>
                fetch(`http://localhost:3001${resource}`, {
                    ...init,
                    credentials: "include",
                }).then(
                    async (response: Response): Promise<any> => response.json(),
                ),
            provider: (): Map<any, any> => new Map(),
            refreshInterval: 1250,
            revalidateOnMount: true,
        }}
    >
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />} errorElement={<></>} path="/">
                    <Route
                        element={<HomePage />}
                        errorElement={<ErrorPage />}
                        index
                    />
                    <Route
                        element={<LoginPage />}
                        errorElement={<ErrorPage />}
                        path="login"
                    />
                    <Route
                        element={<SignUp />}
                        errorElement={<ErrorPage />}
                        path="signup"
                    />
                    <Route
                        element={<Dashboard />}
                        errorElement={<ErrorPage />}
                        path="dashboard"
                    />
                    <Route
                        element={<ErrorPage />}
                        errorElement={<></>}
                        path="*"
                    />
                </Route>
            </Routes>
            <ToastContainer autoClose={8000} closeButton />
        </BrowserRouter>
    </SWRConfig>,
);
