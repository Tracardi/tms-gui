import {createTheme} from "@mui/material";

export const lightTheme = createTheme({
    typography: {
        "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        mode: "light",
        primary: {
            main: '#3B82F6',  // #1976d2
            light: '#e1f5fe'  // e1f5fe
        },
        secondary: {
            main: '#EF6C00',
        },
        error: {
            main: "#d81b60",
        },
        success: {
            main: "#43a047",
        },
        background: {
            default: 'whitesmoke',  // whitesmoke
            paper: "white" // white
        },
        text: {
            primary: '#000',
            secondary: '#444',
        },
        common: {
            white: "white",
            black: "black"
        }
    }
})

export const darkTheme = createTheme({
    typography: {
        "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        mode: "dark",
        primary: {
            main: '#90caf9',
            light: '#e3f2fd'
        },
        secondary: {
            main: '#ffab40',
        },
        error: {
            main: "#ef9a9a",
        },
        success: {
            main: "#81c784",
        },
        background: {
            default: '#303030',
            paper: "#424242",
        },
        text: {
            primary: '#fff',
            secondary: '#bdbdbd',
        },
        common: {
            white: "#fff",
            black: "#000"
        }
    },
})
