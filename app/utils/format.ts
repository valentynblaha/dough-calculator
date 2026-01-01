const numberLocale = new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
    useGrouping: false
});

export default numberLocale;