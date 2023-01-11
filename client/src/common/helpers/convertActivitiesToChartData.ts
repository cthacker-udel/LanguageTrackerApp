/* eslint-disable max-statements -- disabled */
import { type ActivityChartData, type ActivityData, Dates } from "../../@types";
import { convertActivityTime } from "./convertActivityTime";
import { dataPlaceholder } from "./dataPlaceholder";

/**
 *
 * @param activities
 */
export const convertActivitiesToChartData = (
    activities: ActivityData[],
): ActivityChartData[] => {
    const activityChartData: ActivityChartData[] = dataPlaceholder.map(
        (eachData: ActivityChartData) => ({
            ...eachData,
        }),
    );
    for (const eachActivity of activities) {
        if (eachActivity.date !== undefined) {
            switch (eachActivity.date.getDay()) {
                case Dates.MONDAY: {
                    activityChartData[0].numberProblems += 1;
                    activityChartData[0].totalTime += convertActivityTime(
                        eachActivity.totalTime,
                        eachActivity.totalTimeMeasurement,
                    );
                    break;
                }
                case Dates.TUESDAY: {
                    activityChartData[1].numberProblems += 1;
                    activityChartData[1].totalTime += convertActivityTime(
                        eachActivity.totalTime,
                        eachActivity.totalTimeMeasurement,
                    );
                    break;
                }
                case Dates.WEDNESDAY: {
                    activityChartData[2].numberProblems += 1;
                    activityChartData[2].totalTime += convertActivityTime(
                        eachActivity.totalTime,
                        eachActivity.totalTimeMeasurement,
                    );
                    break;
                }
                case Dates.THURSDAY: {
                    activityChartData[3].numberProblems += 1;
                    activityChartData[3].totalTime += convertActivityTime(
                        eachActivity.totalTime,
                        eachActivity.totalTimeMeasurement,
                    );
                    break;
                }
                case Dates.FRIDAY: {
                    activityChartData[4].numberProblems += 1;
                    activityChartData[4].totalTime += convertActivityTime(
                        eachActivity.totalTime,
                        eachActivity.totalTimeMeasurement,
                    );
                    break;
                }
                case Dates.SATURDAY: {
                    activityChartData[5].numberProblems += 1;
                    activityChartData[5].totalTime += convertActivityTime(
                        eachActivity.totalTime,
                        eachActivity.totalTimeMeasurement,
                    );
                    break;
                }
                case Dates.SUNDAY: {
                    activityChartData[6].numberProblems += 1;
                    activityChartData[6].totalTime += convertActivityTime(
                        eachActivity.totalTime,
                        eachActivity.totalTimeMeasurement,
                    );
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    for (let index = 0; index < 7; index += 1) {
        if (activityChartData[index].numberProblems > 0) {
            activityChartData[index].averageTime =
                activityChartData[index].totalTime /
                activityChartData[index].numberProblems;
        }
    }

    return activityChartData;
};
