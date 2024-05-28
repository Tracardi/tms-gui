import {AppBar} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {MdMenu} from "react-icons/md";
import {useTheme} from "@mui/material/styles";
import ThemeSwitch from "../themeSwitch.tsx";

interface MainAppBarProps {
    open: boolean,
    handleDrawerOpen: () => void,
    drawerWidth: number
}

export default function MenuAppBar({open, handleDrawerOpen, drawerWidth}: MainAppBarProps) {

    const theme = useTheme()

    const appBarSX = {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer + 1,
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        })
    }

    return (
        <AppBar position="fixed" sx={appBarSX}>
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer"
                            onClick={handleDrawerOpen} edge="start"
                            sx={{marginRight: 5, ...(open && {display: 'none'})}}>
                    <MdMenu/>
                </IconButton>
                <ThemeSwitch/>
            </Toolbar>
        </AppBar>
    )
}
