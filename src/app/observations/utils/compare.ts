export function compareDates(d1: Date, d2: Date, isAsc: boolean) {
    let result = 0;
    if (d1.getFullYear() < d2.getFullYear() ||
        d1.getFullYear() === d2.getFullYear() && d1.getMonth() < d2.getMonth() ||
        d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() < d2.getDate()) {
        result = -1;
    } else if (d1.getFullYear() > d2.getFullYear() ||
        d1.getFullYear() === d2.getFullYear() && d1.getMonth() > d2.getMonth() ||
        d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() > d2.getDate()) {
        result = 1;
    } else {
        result = 0;
    }
    return result * (isAsc ? 1 : -1);
}

export function compareTimes(d1: Date, d2: Date, isAsc: boolean) {
    let result = 0;
    if (d1.getHours() < d2.getHours() ||
        d1.getHours() === d2.getHours() && d1.getMinutes() < d2.getMinutes() ||
        d1.getHours() === d2.getHours() && d1.getMinutes() === d2.getMinutes() && d1.getSeconds() < d2.getSeconds()) {
        result = -1;
    } else if (d1.getHours() > d2.getHours() ||
        d1.getHours() === d2.getHours() && d1.getMinutes() > d2.getMinutes() ||
        d1.getHours() === d2.getHours() && d1.getMinutes() === d2.getMinutes() && d1.getSeconds() > d2.getSeconds()) {
        result = 1;
    } else {
        result = 0;
    }
    return result * (isAsc ? 1 : -1);
}

export function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    let result = 0;
    if (a < b) {
        result = -1;
    } else if (a > b) {
        result = 1;
    } else {
        result = 0;
    }
    return result * (isAsc ? 1 : -1);
}
