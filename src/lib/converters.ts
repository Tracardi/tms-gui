export function round(num: number, places: number) {
    return +(Math.round(num + "e+" as unknown as number + places) + "e-" + places);
}

export function abbreviateNumber(value: number | string) {
    let newValue: number | string = typeof value === "number" ? value : 0;
    if (newValue >= 1000) {
        const suffixes = ["", "k", "m", "b", "t"];
        const suffixNum = Math.floor(("" + newValue).length / 3);
        let shortValue: number | string = 0
        for (let precision = 3; precision >= 1; precision--) {
            shortValue = parseFloat((suffixNum !== 0 ? (newValue / Math.pow(1000, suffixNum)) : newValue).toPrecision(precision));
            const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
            if (dotLessShortValue.length <= 4) {
                break;
            }
        }
        if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(2);
        newValue = shortValue + suffixes[suffixNum];
        return newValue
    }
    return round(newValue, 3).toString();
}
