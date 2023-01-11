/* eslint-disable no-console -- disabled */
/* eslint-disable ramda/prefer-ramda-boolean -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable camelcase -- disabled */

import React from "react";
import { Button, Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayTriggerRenderProps } from "react-bootstrap/esm/OverlayTrigger";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Area,
    AreaChart,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useSwr from "swr";

import type {
    ActivityChartData,
    ActivityData,
    ActivityType,
    APICompliantActivity,
} from "../../@types";
import {
    type ActivityBucket,
    bucketizeActivities,
    capitalize,
    databasetiseActivity,
    getUsername,
    ProgrammingLanguageModal,
} from "../../common";
import { ServerSideApi } from "../../common/api";
import { convertApiActivities } from "../../common/helpers/convertApiActivities";
import { dataPlaceholder } from "../../common/helpers/dataPlaceholder";
import { renderTooltip } from "../../common/helpers/renderTooltip";
import { useSession } from "../../hooks";
import codewarsLogo from "./codewarslogo.svg";
import styles from "./Dashboard.module.css";
import edabitLogo from "./edabitlogo.png";
import languagesGif from "./languages.gif";
import leetcodeLogo from "./leetcodelogo.png";

type DashboardOverlays = {
    codewars: boolean;
    edabit: boolean;
    languages: boolean;
    leetcode: boolean;
};

type DashboardOverlayKeys = "codewars" | "edabit" | "languages" | "leetcode";

const initialOverlays: DashboardOverlays = {
    codewars: false,
    edabit: false,
    languages: false,
    leetcode: false,
};

/**
 * Dashboard component
 *
 * @returns Dashboard component, which houses all the logic for starting your account in the language tracker
 */
const Dashboard = (): JSX.Element => {
    const { sessionValid, validating } = useSession();
    const navigate = useNavigate();

    const { data: activities, mutate } = useSwr<APICompliantActivity[]>(
        `/api/activity/dashboard?currentday='${new Date().toDateString()}'`,
    );

    const [sessionUsername, setSessionUsername] = React.useState<
        string | undefined
    >(undefined);

    const [activityBucket, setActivityBucket] = React.useState<ActivityBucket>(
        bucketizeActivities(activities ?? []),
    );

    const [codewarsActivities, setCodewarsActivities] = React.useState<
        ActivityChartData[]
    >(
        dataPlaceholder.map((eachData: ActivityChartData) => ({
            ...eachData,
        })),
    );
    const [edabitActivities, setEdabitActivities] = React.useState<
        ActivityChartData[]
    >(
        dataPlaceholder.map((eachData: ActivityChartData) => ({
            ...eachData,
        })),
    );
    const [leetcodeActivities, setLeetcodeActivities] = React.useState<
        ActivityChartData[]
    >(
        dataPlaceholder.map((eachData: ActivityChartData) => ({
            ...eachData,
        })),
    );
    const [languagesActivities, setLanguagesActivities] = React.useState<
        ActivityChartData[]
    >(
        dataPlaceholder.map((eachData: ActivityChartData) => ({
            ...eachData,
        })),
    );

    const [overlays, setOverlays] =
        React.useState<DashboardOverlays>(initialOverlays);

    const backToLogin = React.useMemo(
        () => () => {
            navigate("/login");
        },
        [navigate],
    );

    const logout = React.useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises -- disabled
        mutate(() => [], { revalidate: false });
        const logoutToast = toast.loading("Logging out...");
        ServerSideApi.post<Response>("/user/logout")
            .then((_: Response) => {
                toast.update(logoutToast, {
                    autoClose: 3000,
                    closeButton: true,
                    isLoading: false,
                    render: "Logged out!",
                    type: "success",
                });
                backToLogin();
            })
            .catch((error: unknown) => {
                console.error(`Failed logging out ${(error as Error)?.stack}`);
                toast.update(logoutToast, {
                    autoClose: 3000,
                    closeButton: true,
                    isLoading: false,
                    render: "Logged out!",
                    type: "success",
                });
                backToLogin();
            });
    }, [backToLogin, mutate]);

    const triggerOverlay = React.useCallback(
        (trigger: DashboardOverlayKeys) => {
            setOverlays((oldOverlays) => {
                oldOverlays[trigger] = !oldOverlays[trigger];
                return { ...oldOverlays };
            });
        },
        [],
    );

    const gatherValidDashboardOverlayKey = React.useCallback(() => {
        const validEntry = (
            Object.entries(overlays) as [DashboardOverlayKeys, boolean][]
        ).filter((eachOverlay) => eachOverlay[1]);
        if (validEntry.length > 0) {
            return validEntry[0][0];
        }
        return undefined;
    }, [overlays]);

    const gatherImageFromValidDashboardOverlayKey = React.useCallback(() => {
        const validKey = gatherValidDashboardOverlayKey();
        const images = [codewarsLogo, edabitLogo, leetcodeLogo, languagesGif];
        const indexMapping: { [key: string]: number } = {
            codewars: 0,
            edabit: 1,
            languages: 3,
            leetcode: 2,
        };
        if (validKey !== undefined) {
            return images[indexMapping[validKey]];
        }
        return undefined;
    }, [gatherValidDashboardOverlayKey]);

    /**
     * Creates the add button that displays when the user hovers over the language
     *
     * @param link - The link we are navigating to when the user clicks the button
     * @returns The add button
     */
    const createAddButton = React.useCallback(
        (key: DashboardOverlayKeys): JSX.Element => (
            <Button
                onClick={(): void => {
                    triggerOverlay(key);
                }}
                variant="outline-light"
            >
                <i className="fa-solid fa-plus" />
            </Button>
        ),
        [triggerOverlay],
    );

    React.useEffect(() => {
        const mainLayout: HTMLDivElement | null =
            document.querySelector("#main_layout");
        if (mainLayout !== null) {
            mainLayout.style.backgroundColor = "#16171b";
            mainLayout.style.padding = "1em";
        }
        const cookieUsername = getUsername(document);
        setSessionUsername(cookieUsername);

        return () => {
            if (mainLayout !== null) {
                mainLayout.style.backgroundColor = "";
                mainLayout.style.padding = "";
            }
        };
    }, []);

    React.useEffect(() => {
        if (activityBucket !== undefined) {
            setCodewarsActivities(
                convertApiActivities(activityBucket.codewars),
            );
            setEdabitActivities(convertApiActivities(activityBucket.edabit));
            setLeetcodeActivities(
                convertApiActivities(activityBucket.leetcode),
            );
            setLanguagesActivities(
                convertApiActivities(activityBucket.languages),
            );
        }
    }, [activityBucket]);

    React.useEffect(() => {
        setActivityBucket(bucketizeActivities(activities ?? []));
    }, [activities]);

    if (validating) {
        // eslint-disable-next-line react/jsx-no-useless-fragment -- needed
        return <></>;
    }

    if (!sessionValid) {
        backToLogin();
    }

    return (
        <>
            <div className={styles.dashboard_title}>
                {"Language Tracker Dashboard"}
                <OverlayTrigger
                    delay={{ hide: 250, show: 250 }}
                    overlay={(
                        properties: OverlayTriggerRenderProps,
                    ): JSX.Element =>
                        renderTooltip(properties, {
                            message: `Logout${
                                sessionUsername ? ` ${sessionUsername}` : ""
                            }`,
                        })
                    }
                    placement="right"
                >
                    <Button
                        className={styles.dashboard_logout_button}
                        onClick={(): void => {
                            logout();
                        }}
                        variant="outline-light"
                    >
                        <i className="fa-solid fa-right-from-bracket fa-xs" />
                    </Button>
                </OverlayTrigger>
            </div>
            <div className={styles.dashboard_content}>
                <div className={styles.programming_section}>
                    <OverlayTrigger
                        delay={{ hide: 1000, show: 250 }}
                        overlay={(
                            properties: OverlayTriggerRenderProps,
                        ): JSX.Element =>
                            renderTooltip(
                                properties,
                                createAddButton("codewars"),
                            )
                        }
                        placement="right"
                    >
                        <div className={styles.programming_problems}>
                            <div
                                className={
                                    styles.programming_problems_logo_container
                                }
                            >
                                <Image
                                    className={styles.site_logo}
                                    src={codewarsLogo}
                                />
                            </div>
                            <span
                                className={styles.programming_problems_solved}
                            >
                                {"Codewars"}
                            </span>
                        </div>
                    </OverlayTrigger>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <AreaChart
                                data={codewarsActivities}
                                height={250}
                                width={500}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend
                                    formatter={(value): string =>
                                        `${value} (seconds)`
                                    }
                                />
                                <Tooltip />
                                <Area
                                    dataKey="totalTime"
                                    fill="rgba(0, 0, 0, .25)"
                                    fillOpacity={1}
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <ComposedChart
                                data={codewarsActivities}
                                height={250}
                                width={700}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                                <Bar
                                    barSize={20}
                                    dataKey="numberProblems"
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.programming_section}>
                    <OverlayTrigger
                        delay={{ hide: 1000, show: 250 }}
                        overlay={(
                            properties: OverlayTriggerRenderProps,
                        ): JSX.Element =>
                            renderTooltip(properties, createAddButton("edabit"))
                        }
                        placement="right"
                    >
                        <div className={styles.programming_problems}>
                            <div
                                className={
                                    styles.programming_problems_logo_container
                                }
                            >
                                <Image
                                    className={styles.site_logo}
                                    src={edabitLogo}
                                />
                            </div>
                            <span
                                className={styles.programming_problems_solved}
                            >
                                {"Edabit"}
                            </span>
                        </div>
                    </OverlayTrigger>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <AreaChart
                                data={edabitActivities}
                                height={250}
                                width={500}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend
                                    formatter={(value): string =>
                                        `${value} (seconds)`
                                    }
                                />
                                <Tooltip />
                                <Area
                                    dataKey="totalTime"
                                    fill="rgba(0, 0, 0, .25)"
                                    fillOpacity={1}
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <ComposedChart
                                data={edabitActivities}
                                height={250}
                                width={700}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                                <Bar
                                    barSize={20}
                                    dataKey="numberProblems"
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.programming_section}>
                    <OverlayTrigger
                        delay={{ hide: 1000, show: 250 }}
                        overlay={(
                            properties: OverlayTriggerRenderProps,
                        ): JSX.Element =>
                            renderTooltip(
                                properties,
                                createAddButton("leetcode"),
                            )
                        }
                        placement="right"
                    >
                        <div className={styles.programming_problems}>
                            <div
                                className={
                                    styles.programming_problems_logo_container
                                }
                            >
                                <Image
                                    className={styles.site_logo}
                                    src={leetcodeLogo}
                                />
                            </div>
                            <span
                                className={styles.programming_problems_solved}
                            >
                                {"Leetcode"}
                            </span>
                        </div>
                    </OverlayTrigger>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <AreaChart
                                data={leetcodeActivities}
                                height={250}
                                width={500}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend
                                    formatter={(value): string =>
                                        `${value} (seconds)`
                                    }
                                />
                                <Tooltip />
                                <Area
                                    dataKey="totalTime"
                                    fill="rgba(0, 0, 0, .25)"
                                    fillOpacity={1}
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <ComposedChart
                                data={leetcodeActivities}
                                height={250}
                                width={700}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                                <Bar
                                    barSize={20}
                                    dataKey="numberProblems"
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.programming_section}>
                    <OverlayTrigger
                        delay={{ hide: 1000, show: 250 }}
                        overlay={(
                            properties: OverlayTriggerRenderProps,
                        ): JSX.Element =>
                            renderTooltip(
                                properties,
                                createAddButton("leetcode"),
                            )
                        }
                        placement="right"
                    >
                        <div className={styles.programming_problems}>
                            <div
                                className={
                                    styles.programming_problems_logo_container
                                }
                            >
                                <Image
                                    className={styles.site_logo}
                                    src={languagesGif}
                                />
                            </div>
                            <span
                                className={styles.programming_problems_solved}
                            >
                                {"Languages"}
                            </span>
                        </div>
                    </OverlayTrigger>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <AreaChart
                                data={languagesActivities}
                                height={250}
                                width={500}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend
                                    formatter={(value): string =>
                                        `${value} (seconds)`
                                    }
                                />
                                <Tooltip />
                                <Area
                                    dataKey="totalTime"
                                    fill="rgba(0, 0, 0, .25)"
                                    fillOpacity={1}
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <ComposedChart
                                data={languagesActivities}
                                height={250}
                                width={700}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                                <Bar
                                    barSize={20}
                                    dataKey="numberProblems"
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <ProgrammingLanguageModal
                dashboardKey={gatherValidDashboardOverlayKey()}
                display={Object.values(overlays).some(Boolean)}
                onClose={(key: DashboardOverlayKeys | undefined): void => {
                    if (key !== undefined) {
                        triggerOverlay(key);
                    }
                }}
                onSubmit={async (
                    key: ActivityType,
                    values: Partial<ActivityData>,
                ): Promise<void> => {
                    const activityStatus = toast.loading("Adding Activity...");
                    const validDashboardKey = gatherValidDashboardOverlayKey();
                    if (validDashboardKey !== undefined) {
                        triggerOverlay(validDashboardKey);
                    }
                    const username = getUsername(document);
                    const addActivityResult =
                        await ServerSideApi.post<Response>(
                            "/activity/addActivity",
                            {
                                ...databasetiseActivity({
                                    ...values,
                                    type: key,
                                } as ActivityData),
                                username,
                            },
                        );
                    if (addActivityResult.status === 204) {
                        toast.update(activityStatus, {
                            autoClose: 8000,
                            closeButton: true,
                            isLoading: false,
                            render: "Activity Successfully Added!",
                            type: "success",
                        });
                    } else {
                        toast.update(activityStatus, {
                            autoClose: 8000,
                            closeButton: true,
                            isLoading: false,
                            render: "Activity Addition Failed!",
                            type: "error",
                        });
                    }
                }}
                programmingLanguageImage={gatherImageFromValidDashboardOverlayKey()}
                title={`Add ${capitalize(
                    gatherValidDashboardOverlayKey(),
                )} Activity`}
            />
        </>
    );
};

export { type DashboardOverlayKeys, type DashboardOverlays, Dashboard };
