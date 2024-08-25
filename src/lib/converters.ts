export function round(num: number, places: number) {
    return +(Math.round(num + "e+" as unknown as number + places) + "e-" + places);
}

export function abbreviateNumber(value: number | string) {
    let newValue: number | string = typeof (value) === "number" ? value : 0

    let suffix = ""

    if (newValue >= 1000) {
        const suffixes = ["", "k", "m", "b", "t"]
        const suffixIndex = Math.floor((newValue.toFixed(0).toString().length - 1) / 3)

        suffix = suffixes[suffixIndex]

        newValue = newValue / Math.pow(1000, suffixIndex)
    }

    return round(newValue, 3).toString() + " " + suffix
}
