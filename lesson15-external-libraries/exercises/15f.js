function isWeekend(date) {
    const weekday = date.format("d");
    return weekday === '0' || weekday === '6';
}

export default isWeekend;
