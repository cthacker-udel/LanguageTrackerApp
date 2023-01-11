import { type APICompliantActivity, ActivityType } from "../../@types";

type ActivityBucket = {
    codewars: APICompliantActivity[];
    edabit: APICompliantActivity[];
    leetcode: APICompliantActivity[];
    languages: APICompliantActivity[];
};

/**
 * Organizes all activities fetched from the api into "buckets", each bucket consisting of each language
 *
 * @param activities - The activities fetched from the postgresql database
 * @returns The bucketized activities
 */
const bucketizeActivities = (
    activities: APICompliantActivity[],
): ActivityBucket => {
    const activityBucket: ActivityBucket = {
        codewars: [],
        edabit: [],
        languages: [],
        leetcode: [],
    };
    for (const eachActivity of activities) {
        switch (eachActivity.activity_type) {
            case ActivityType.CODEWARS: {
                activityBucket.codewars.push(eachActivity);
                break;
            }
            case ActivityType.EDABIT: {
                activityBucket.edabit.push(eachActivity);
                break;
            }
            case ActivityType.LEETCODE: {
                activityBucket.leetcode.push(eachActivity);
                break;
            }
            default: {
                activityBucket.languages.push(eachActivity);
                break;
            }
        }
    }
    return activityBucket;
};

export { type ActivityBucket, bucketizeActivities };
