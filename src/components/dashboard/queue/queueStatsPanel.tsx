import Grid from "@mui/material/Grid";
import ConnectionGauge from "../connectionGauge.tsx";
import {Button, Collapse, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import BacklogCard from "./backlogCard.tsx";
import DashboardNavbar from "../dashboardNavbar.tsx";
import Divider from "@mui/material/Divider";
import SubscriptionsList from "./subscriptionsList.tsx";
import Box from "@mui/material/Box";
import useRefreshTime from "../../../hooks/useRefreshTime.ts";
import StatusWrapper from "../statusWrapper.tsx";
import {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa6";
import useQueueStatsData from "../../../hooks/useQueueStatsData.ts";
import useQueueNamespacesAndTopics from "../../../hooks/useQueueNamespacesAndTopics.ts";

export default function QueueStatsPanel() {

    const {getRefreshTime, setRefreshTime} = useRefreshTime()
    const [show, setShow] = useState(false)
    const maxRate = 10_000
    const refreshData = {
        time: getRefreshTime(),
        onChange: (e: SelectChangeEvent<number>) => {
            setRefreshTime(e.target.value)
        },
    }
    const {
        data: topicsData,
        status: topicsStatus,
        getSelectedTopic,
        setSelectedTopic
    } = useQueueNamespacesAndTopics()

    const queueUrlConfig = {
        value: getSelectedTopic(),
        onChange: (e: SelectChangeEvent) => {
            setSelectedTopic(e.target.value)
        }
    }

    const {
        data, status, fetchStatus
    } = useQueueStatsData(refreshData.time, queueUrlConfig.value)

    const clickHandler = () => {
        setShow(prev => !prev)
    }

    const statsData = data?.data

    return (
        <>
            <Box>
                <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                                 fetchStatus={fetchStatus}>
                    <FormControl sx={{m: 1, ml: 0, minWidth: 140}} size="small" variant="filled">
                        <InputLabel id="topic">Namespace/Topic</InputLabel>
                        <Select disabled={topicsStatus != "success"} value={queueUrlConfig.value} variant={"filled"}
                                autoWidth={true} labelId="topic"
                                label={"select topic"} onChange={queueUrlConfig.onChange}>
                            {topicsData?.data.map((topicArr) => {
                                return <MenuItem
                                    value={`${topicArr[0]}/${topicArr[1]}`}>{topicArr[0]}/{topicArr[1]}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </DashboardNavbar>
                <Divider/>
            </Box>
            {(status !== "success" || !data) ? <StatusWrapper status={status}/> : <>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <ConnectionGauge rate={statsData!.msgRateIn} maxRate={maxRate} label={"Msg Rate In"}
                                         throughput={statsData!.msgThroughputIn}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack sx={{height: "100%"}}>
                            <BacklogCard subscriptions={statsData!.subscriptions}/>
                            <Button color={"primary"} variant={"contained"} onClick={clickHandler}>
                                {show ? <FaChevronUp/> : <FaChevronDown/>}
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ConnectionGauge rate={statsData!.msgRateOut} maxRate={maxRate} label={"Msg Rate Out"}
                                         throughput={statsData!.msgThroughputOut}/>
                    </Grid>
                </Grid>
                <Box sx={{
                    width: "100%",
                    minHeight: "300px",
                    flex: "1 0 0",
                    overflow: "auto"
                }}>
                    <Collapse in={show}>
                        <SubscriptionsList subscriptions={statsData!.subscriptions}/>
                    </Collapse>
                </Box>
            </>}
        </>
    )
}
