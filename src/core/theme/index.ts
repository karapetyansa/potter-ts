export interface ITheme {
    boxShadow: string;
    fontFamily: string;
    maxWidth: number;
    colors: {
        beige: string;
        blueAccent: string;
        mainGrey: string;
        opacity: string;
        paleGrey: string;
        paleGreyTwo: string;
        rose: string;
        slate: string;
        white: string;
        lightGrey: string;
    };
}

export const theme: ITheme = {
    boxShadow: "0 2px 6px 1px rgba(0, 0, 0, 0.03)",
    colors: {
        beige: "#f9f5f0",
        blueAccent: "#0f77ff",
        lightGrey: "#f4f4f4",
        mainGrey: "#a1a9b3",
        opacity: "rgba(0, 0, 0, 0)",
        paleGrey: "#eef2f5",
        paleGreyTwo: "#dde3e7",
        rose: "#d15676",
        slate: "#3e4c5b",
        white: "#ffffff"
    },
    fontFamily: "SFUIText",
    maxWidth: 1440
};
