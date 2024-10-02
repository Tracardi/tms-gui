import {Switch} from "@mui/material";
import Box from "@mui/material/Box";
import useThemeModeContext from "../../hooks/useThemeModeContext.ts";
import {MdSunny} from "react-icons/md";
import {IoMdMoon} from "react-icons/io";

export default function ThemeSwitch() {

    const {themeMode, toggleTheme} = useThemeModeContext()

    const checked = themeMode === "dark"

    const changeHandler = () => {
        toggleTheme()
    }

    return (
        <Box sx={{marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.4rem"}}>
            <MdSunny/>
            <Switch onChange={changeHandler} checked={checked}/>
            <IoMdMoon/>
        </Box>
    )
}
