import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ConnectionGauge from "./connectionGauge.tsx";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import BacklogCard from "./backlogCard.tsx";
import DashboardNavbar from "./dashboardNavbar.tsx";
import Divider from "@mui/material/Divider";
import {IQueueStats} from "../../types/api/queue";
import {AxiosResponse} from "axios";
import {IValidationError} from "../../types/api/api";
import SubscriptionsList from "./subscriptionsList.tsx";
import Box from "@mui/material/Box";
import {IRefreshData, IStatsPanel} from "../../types/ui/statsPanel";

interface IQueueStatsPanel extends IStatsPanel<AxiosResponse<IQueueStats, IValidationError> | undefined> {
    maxRate: number,
    refreshData: IRefreshData
}

export default function QueueStatsPanel({data, status, maxRate, refreshData, fetchStatus}: IQueueStatsPanel) {

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

    const statsData = data.data

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
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ConnectionGauge rate={statsData.msgRateIn} maxRate={maxRate} label={"Msg Rate In"}
                                     throughput={statsData.msgThroughputIn}/>
                </Grid>
                <Grid item xs={6}>
                    <BacklogCard subscriptions={statsData.subscriptions}/>
                </Grid>
                <Grid item xs={3}>
                    <ConnectionGauge rate={statsData.msgRateOut} maxRate={maxRate} label={"Msg Rate Out"}
                                     throughput={statsData.msgThroughputOut}/>
                </Grid>
            </Grid>
            <SubscriptionsList subscriptions={statsData.subscriptions}/>
        </Paper>
    )
}
