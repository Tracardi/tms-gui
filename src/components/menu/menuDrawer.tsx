import {Drawer} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {MdAreaChart, MdChevronLeft, MdChevronRight, MdPeople} from "react-icons/md";
import { RiShieldKeyholeLine } from "react-icons/ri";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from "@mui/material/styles";
import {Link} from "react-router-dom";
import {Theme} from "../../types/ui/theme";
import MenuLogout from "./menuLogout.tsx";

interface MainDrawerProps {
    open: boolean,
    handleDrawerClose: () => void,
    drawerWidth: number,
}

export default function MenuDrawer({open, handleDrawerClose, drawerWidth}: MainDrawerProps) {

    const theme: Theme = useTheme()
    const navOptions = [
        {
            name: "dashboard",
            icon: <MdAreaChart size={22}/>,
            route: "/"
        },
        {
            name: "licenses",
            icon: <RiShieldKeyholeLine size={22}/>,
            route: "/licenses"
        },
        {
            name: "tenants",
            icon: <MdPeople size={22}/>,
            route: "/tenants"
        }
    ]

    const openedDrawerSx = {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    }

    const closedDrawerSx = {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    }

    const drawerSX = {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedDrawerSx,
            '& .MuiDrawer-paper': openedDrawerSx
        }),
        ...(!open && {
            ...closedDrawerSx,
            '& .MuiDrawer-paper': closedDrawerSx
        }),
    }

    const drawerHeaderSX = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }

    return (
        <Drawer variant="permanent" open={open} sx={drawerSX}>
            <Box sx={drawerHeaderSX}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <MdChevronRight/> : <MdChevronLeft/>}
                </IconButton>
            </Box>
            <Divider/>
            <List>
                {navOptions.map((navOption, index) => (
                    <Link to={navOption.route} key={index}>
                        <ListItem key={navOption.name} disablePadding sx={{display: 'block'}}>
                            <ListItemButton sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}>
                                <ListItemIcon sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                    {navOption.icon}
                                </ListItemIcon>
                                <ListItemText primary={navOption.name}
                                              sx={{textTransform: "capitalize", opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
                <MenuLogout isDrawerOpen={open}/>
            </List>
        </Drawer>
    )
}
