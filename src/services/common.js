export const FormatPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const TimeSince  = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " წლის წინ";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " თვის წინ";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " დღის წინ";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " საათის წინ";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " წუთის წინ";
    }
    return Math.floor(seconds) + " წამის წინ";
}
