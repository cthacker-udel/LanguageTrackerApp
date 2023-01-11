/* eslint-disable camelcase -- disabled */

import type { ActivityData, APICompliantActivity } from "../../@types";

/**
 * Converts a supplied front-end activity into the api compliant activity
 *
 * @param activity - The activity to convert
 * @returns The activity with it's internal fields converted to api compliance
 */
export const databasetiseActivity = (
    activity: ActivityData,
): APICompliantActivity => {
    const apiActivity: Partial<APICompliantActivity> = {};
    apiActivity.title = activity.title;
    apiActivity.description = activity.description;
    apiActivity.activity_level = activity.level;
    apiActivity.total_time = activity.totalTime;
    apiActivity.time_type = activity.totalTimeMeasurement;
    apiActivity.language_type = activity.language;
    apiActivity.activity_type = activity.type;
    apiActivity.link = activity.link;
    apiActivity.activity_date = activity.date;
    return apiActivity as APICompliantActivity;
};
