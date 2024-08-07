import Box from '@mui/material/Box';
import {Outlet} from "react-router-dom";
import {useState} from "react";
import MenuDrawer from "../components/menu/menuDrawer.tsx";
import MenuAppBar from "../components/menu/menuAppBar.tsx";

export default function MainLayout() {

    const drawerWidth = 240;
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{display: 'flex', minHeight: "100vh"}}>
            <MenuAppBar open={open} handleDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth}/>
            <MenuDrawer open={open} handleDrawerClose={handleDrawerClose} drawerWidth={drawerWidth}/>
            <Box component="main" sx={{flexGrow: 1, p: 4, marginTop: "64px"}}>
                <Outlet/>
            </Box>
        </Box>
    );
}
