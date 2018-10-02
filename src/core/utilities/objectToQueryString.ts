export const objectToQueryString = (obj: {[key: string]: number | string | boolean | null | undefined}) => {
    return Object.keys(obj).reduce(
        (acc, key) => (obj[key] == null ? acc : `${acc}${acc === "" ? "" : "&"}${key}=${obj[key]}`),
        ""
    );
};
