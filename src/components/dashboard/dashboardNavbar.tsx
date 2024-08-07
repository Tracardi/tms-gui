import Box from "@mui/material/Box";
import {FormControl, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface IDashboardNavbar {
    refreshTime: number,
    onRefreshTimeChange: (e: SelectChangeEvent<number>) => void,
    fetchStatus: "fetching" | "idle" | "paused"
}

export default function DashboardNavbar({refreshTime, onRefreshTimeChange, fetchStatus}: IDashboardNavbar) {

    return (
        <Box sx={{padding: "0.6rem 0rem", width: "100%", display: "flex", alignItems: "center", gap: "1rem",}}>
            <FormControl sx={{m: 1, ml: 0 ,minWidth: 140}} size="small" variant="filled">
                <InputLabel id="refresh">Refresh</InputLabel>
                <Select value={refreshTime} autoWidth={true} labelId="refresh" label={"refresh"}
                        onChange={onRefreshTimeChange}>
                    <MenuItem value={5000}>5 seconds</MenuItem>
                    <MenuItem value={10000}>10 seconds</MenuItem>
                    <MenuItem value={30000}>30 seconds</MenuItem>
                    <MenuItem value={60000}>1 minute</MenuItem>
                </Select>
            </FormControl>
            {fetchStatus === "fetching" && <LinearProgress color="secondary" sx={{width: "100%"}}/>}
        </Box>
    )
}
