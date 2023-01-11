/* eslint-disable sonarjs/no-nested-switch -- disabled */
import { TimeMeasurement } from "../../@types";

/**
 * Takes in a time and converts it to the output time
 *
 * @param time - The time we are receiving
 * @param timeMeasurement - The time we are outputting
 * @param output - The measurement we are outputting
 */
export const convertActivityTime = (
    time: number,
    timeMeasurement: TimeMeasurement,
    output: TimeMeasurement = TimeMeasurement.SECONDS,
): number => {
    switch (output) {
        case TimeMeasurement.HOURS: {
            switch (timeMeasurement) {
                case TimeMeasurement.MINUTES: {
                    return time / 60;
                }
                case TimeMeasurement.SECONDS: {
                    return time / 3600;
                }
                default: {
                    break;
                }
            }
            break;
        }
        case TimeMeasurement.MINUTES: {
            switch (timeMeasurement) {
                case TimeMeasurement.HOURS: {
                    return time / 60;
                }
                case TimeMeasurement.SECONDS: {
                    return time * 60;
                }
                default: {
                    break;
                }
            }
            break;
        }
        case TimeMeasurement.SECONDS: {
            switch (timeMeasurement) {
                case TimeMeasurement.MINUTES: {
                    return time * 60;
                }
                case TimeMeasurement.HOURS: {
                    return time * 3600;
                }
                default: {
                    break;
                }
            }
            break;
        }
        default: {
            break;
        }
    }
    return time;
};
