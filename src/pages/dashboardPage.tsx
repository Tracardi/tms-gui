import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import StatsPanel from "../components/dashboard/statsPanel.tsx";
import useConnection from "../lib/api/connection/useConnection.ts";
import {getQueueStats} from "../lib/api/queue/getQueueStats.ts";
import {useQuery} from "@tanstack/react-query";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import SourcesPanel from "../components/dashboard/sourcesPanel.tsx";
import {SelectChangeEvent} from "@mui/material";
import {getDefaultInfo} from "../lib/api/getDefaultInfo.ts";

export interface ISources {
    id: number,
    label: string,
    connectionStatus: "success" | "pending" | "idle" | "error",
    testConnection: () => void
}

export default function DashboardPage() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const [refetchInterval, setRefetchInterval] = useState(10000)
    const refreshData = {
        time: refetchInterval,
        onChange: (e: SelectChangeEvent<number>) => {
            setRefetchInterval(e.target.value as number)
        }
    }

    const {status: queueStatus, testConnection: testQueue} = useConnection({mutationFn: getQueueStats})
    const {status: elasticsearchStatus, testConnection: testElasticsearch} = useConnection({mutationFn: getDefaultInfo})

    const {data: statsPanelResponse, status: statsPanelStatus, fetchStatus: statsPanelFetchStatus} = useQuery({
        queryKey: ["queueStats"], queryFn: () => {
            return getQueueStats({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval: refetchInterval
    })

    const baseSources = [{
        id: 1,
        label: "Elasticsearch",
        connectionStatus: elasticsearchStatus,
        testConnection: testElasticsearch
    }, {
        id: 2,
        label: "Queue",
        connectionStatus: queueStatus,
        testConnection: testQueue
    }]
    const [sources, setSources] = useState<ISources[]>(baseSources)

    useEffect(() => {
        setSources(baseSources)
    }, [queueStatus, elasticsearchStatus]);

    return (
        <Box sx={{m: 0, p: 2, width: "100%", height: "100%", display: "flex", gap: "2rem"}}>
            <SourcesPanel sources={sources}/>
            <StatsPanel status={statsPanelStatus} data={statsPanelResponse} maxRate={10000} refreshData={refreshData}
                        fetchStatus={statsPanelFetchStatus}/>
        </Box>
    )
}
