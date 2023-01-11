/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable no-confusing-arrow -- disabled */
import type {
    ActivityChartData,
    ActivityLanguage,
    ActivityLevel,
    ActivityType,
    APICompliantActivity,
    TimeMeasurement,
} from "../../@types";
import { convertActivitiesToChartData } from "./convertActivitiesToChartData";
import { dataPlaceholder } from "./dataPlaceholder";

/**
 *
 * @param activities
 * @returns
 */
export const convertApiActivities = (
    activities: APICompliantActivity[],
): ActivityChartData[] =>
    activities.length > 0
        ? convertActivitiesToChartData(
              activities.map((eachActivity: APICompliantActivity) => ({
                  ...eachActivity,
                  date: new Date(eachActivity.activity_date),
                  language: eachActivity.language_type as ActivityLanguage,
                  level: eachActivity.activity_level as ActivityLevel,
                  totalTime: eachActivity.total_time,
                  totalTimeMeasurement:
                      eachActivity.time_type as TimeMeasurement,
                  type: eachActivity.activity_type as ActivityType,
              })),
          )
        : [...dataPlaceholder];
