import Grid from "@mui/material/Grid";
import ConnectionGauge from "../connectionGauge.tsx";
import {Button, Collapse, SelectChangeEvent, Stack} from "@mui/material";
import BacklogCard from "./backlogCard.tsx";
import DashboardNavbar from "../dashboardNavbar.tsx";
import Divider from "@mui/material/Divider";
import SubscriptionsList from "./subscriptionsList.tsx";
import Box from "@mui/material/Box";
import {useQuery} from "@tanstack/react-query";
import {getQueueStats} from "../../../lib/api/queue/getQueueStats.ts";
import useApiAuthContext from "../../../hooks/useApiAuthContext.ts";
import useRefreshTime from "../../../hooks/useRefreshTime.ts";
import StatusWrapper from "../statusWrapper.tsx";
import {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa6";

export default function QueueStatsPanel() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {getRefreshTime, setRefreshTime} = useRefreshTime()
    const [show, setShow] = useState(false)

    const clickHandler = () => {
        setShow(prev => !prev)
    }

    const maxRate = 10_000
    const refreshData = {
        time: getRefreshTime(),
        onChange: (e: SelectChangeEvent<number>) => {
            setRefreshTime(e.target.value)
        },
    }

    const {
        data,
        status,
        fetchStatus
    } = useQuery({
        queryKey: ["queueStats"], queryFn: () => {
            return getQueueStats({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval: refreshData.time
    })

    if (status !== "success" || !data) {
        return <StatusWrapper status={status}/>
    }

    const statsData = data?.data

    return (
        <>
            <Box>
                <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                                 fetchStatus={fetchStatus}/>
                <Divider/>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <ConnectionGauge rate={statsData.msgRateIn} maxRate={maxRate} label={"Msg Rate In"}
                                     throughput={statsData.msgThroughputIn}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack sx={{height: "100%"}}>
                        <BacklogCard subscriptions={statsData.subscriptions}/>
                        <Button color={"primary"} variant={"contained"} onClick={clickHandler}>
                            {show ? <FaChevronUp/> : <FaChevronDown/>}
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <ConnectionGauge rate={statsData.msgRateOut} maxRate={maxRate} label={"Msg Rate Out"}
                                     throughput={statsData.msgThroughputOut}/>
                </Grid>
            </Grid>
            <Box sx={{
                width: "100%",
                minHeight: "300px",
                flex: "1 0 0",
                overflow: "scroll"
            }}>
                <Collapse in={show}>
                    <SubscriptionsList subscriptions={statsData.subscriptions}/>
                </Collapse>
            </Box>
        </>
    )
}
