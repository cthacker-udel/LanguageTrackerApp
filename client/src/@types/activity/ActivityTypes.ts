import type {
    ActivityLanguage,
    ActivityLevel,
    ActivityType,
    TimeMeasurement,
} from "./ActivityEnums";

type ActivityData = {
    date: Date;
    description: string;
    language: ActivityLanguage;
    level: ActivityLevel;
    link: string;
    title: string;
    totalTime: number;
    totalTimeMeasurement: TimeMeasurement;
    type?: ActivityType;
};

type ActivityChartData = {
    averageTime: number;
    day: string;
    numberProblems: number;
    totalTime: number;
};

type APICompliantActivity = {
    activity_level: number;
    activity_type: number;
    activity_date: Date;
    description: string;
    language_type: number;
    link: string;
    title: string;
    time_type: number;
    total_time: number;
};

export type { ActivityChartData, ActivityData, APICompliantActivity };
