import { Dates } from "../../@types";

/**
 * Takes in a date, and returns the string equivalent of which day it lays on
 *
 * @param date - The date to convert the day to a string version of it
 * @returns The stringified version of the date
 */
export const convertDayToString = (date: Date): string => {
    switch (date.getDay()) {
        case Dates.MONDAY: {
            return "Monday";
        }
        case Dates.TUESDAY: {
            return "Tuesday";
        }
        case Dates.WEDNESDAY: {
            return "Wednesday";
        }
        case Dates.THURSDAY: {
            return "Thursday";
        }
        case Dates.FRIDAY: {
            return "Friday";
        }
        case Dates.SATURDAY: {
            return "Saturday";
        }
        default: {
            return "Sunday";
        }
    }
};
