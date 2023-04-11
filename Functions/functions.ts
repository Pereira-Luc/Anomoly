//Format Date Shows time < 1h in minutes and > 1h in hours
//Time > 24h in days and > 7d in weeks and > 4w in months
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";

export const getTimeFormat = (date: Date) => {
    let d = new Date(date)
    let now = new Date()
    let diff = now.getTime() - d.getTime()
    let diffInHours = diff / (1000 * 3600)
    let diffInMinutes = diff / (1000 * 60)
    let diffInDays = diff / (1000 * 3600 * 24)
    let diffInWeeks = diff / (1000 * 3600 * 24 * 7)
    let diffInMonths = diff / (1000 * 3600 * 24 * 7 * 4)
    //if less than 1 minute show "now"
    if (diffInMinutes < 1) {
        return "now"
    }
    if (diffInHours < 1) {
        return Math.round(diffInMinutes) + "m"
    }
    if (diffInHours < 24) {
        return Math.round(diffInHours) + "h"
    }
    if (diffInDays < 7) {
        return Math.round(diffInDays) + "d"
    }
    if (diffInWeeks < 4) {
        return Math.round(diffInWeeks) + "w"
    }
    return Math.round(diffInMonths) + "m"
}


export async function base64ToImage(base64String: string, width: number) {
    const {uri} = await manipulateAsync(
        `data:image/jpeg;base64,${base64String}`,
        [{resize: {width}}],
        {format: SaveFormat.JPEG, compress: 1}
    );

    return uri;
}