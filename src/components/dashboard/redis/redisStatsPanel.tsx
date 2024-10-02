import useApiAuthContext from "../../../hooks/useApiAuthContext.ts";
import useRefreshTime from "../../../hooks/useRefreshTime.ts";
import {SelectChangeEvent} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getRedisInfo} from "../../../lib/api/connection/getRedisInfo.ts";
import StatusWrapper from "../statusWrapper.tsx";
import DashboardNavbar from "../dashboardNavbar.tsx";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import DashboardList from "../dashboardList.tsx";
import {redisMemoryMetrics} from "../../../lib/configs/redisMemoryMetrics.ts";

export default function RedisStatsPanel() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {getRefreshTime, setRefreshTime} = useRefreshTime()

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
        queryKey: ["redisStats"], queryFn: () => {
            return getRedisInfo({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval: refreshData.time
    })

    if (status !== "success" || !data) {
        return <StatusWrapper status={status}/>
    }

    return (
        <>
            <Box>
                <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                                 fetchStatus={fetchStatus}/>
                <Divider/>
            </Box>
            <DashboardList sx={{
                width: "100%",
                flex: "1 0 0",
                padding: "1rem 2rem",
                overflow: "auto"
            }} data={data.data} propertiesDescription={redisMemoryMetrics} title="Redis info"/>
        </>
    )
}
