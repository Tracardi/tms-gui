import {IRefreshData, IStatsPanel} from "../../types/ui/statsPanel";
import {AxiosResponse} from "axios";
import {IValidationError} from "../../types/api/api";
import {CircularProgress, Paper} from "@mui/material";
import DashboardNavbar from "./dashboardNavbar.tsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ElasticsearchClusterList from "./elasticsearchClusterList.tsx";

interface IElasticsearchStatsPanel extends IStatsPanel<AxiosResponse<object, IValidationError> | undefined> {
    refreshData: IRefreshData
}

export default function ElasticsearchStatsPanel({data, status, fetchStatus, refreshData}: IElasticsearchStatsPanel) {

    if (status == "pending") {
        return (
            <Paper sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                   square={false}>
                <CircularProgress/>
            </Paper>
        )
    }

    if (status == "error" || !data) {
        return <Paper sx={{width: "100%", height: "100%"}} square={false}>
            <Typography variant={"h2"}>Could not get data.</Typography>
        </Paper>
    }

    return (
        <Paper sx={{
            width: "100%",
            height: "100%",
            padding: "0 2rem 1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
        }} square={false}>
            <Box>
                <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                                 fetchStatus={fetchStatus}/>
                <Divider/>
            </Box>
            <ElasticsearchClusterList/>
        </Paper>
    )
}
