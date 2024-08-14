import Box from "@mui/material/Box";
import {useEffect, useMemo, useState} from "react";
import QueueStatsPanel from "../components/dashboard/queueStatsPanel.tsx";
import useConnection from "../lib/api/connection/useConnection.ts";
import {getQueueStats} from "../lib/api/queue/getQueueStats.ts";
import {useQuery} from "@tanstack/react-query";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import SourcesPanel from "../components/dashboard/sourcesPanel.tsx";
import {SelectChangeEvent} from "@mui/material";
import {getDefaultInfo} from "../lib/api/connection/getDefaultInfo.ts";
import {getRedisInfo} from "../lib/api/connection/getRedisInfo.ts";
import {useSearchParams} from "react-router-dom";
import ElasticsearchStatsPanel from "../components/dashboard/elasticsearchStatsPanel.tsx";

export interface ISource {
    label: string,
    connectionStatus: "success" | "pending" | "idle" | "error",
    testConnection: () => void,
    isClickable: boolean
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
    const {status: redisStatus, testConnection: testRedis} = useConnection({mutationFn: getRedisInfo})

    const {
        data: queueStatsPanelResponse,
        status: queueStatsPanelStatus,
        fetchStatus: queueStatsPanelFetchStatus
    } = useQuery({
        queryKey: ["queueStats"], queryFn: () => {
            return getQueueStats({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval
    })

    const {
        data: elasticsearchStatsResponse,
        status: elasticsearchStatsStatus,
        fetchStatus: elasticsearchStatsFetchStatus
    } = useQuery({
        queryKey: ["elasticsearchStats"], queryFn: () => {
            return getDefaultInfo({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval
    })

    const
        baseSources: ISource[] = useMemo(() => {
            return [{
                label: "Elasticsearch",
                connectionStatus: elasticsearchStatus,
                testConnection: testElasticsearch,
                isClickable: true
            }, {
                label: "Queue",
                connectionStatus: queueStatus,
                testConnection: testQueue,
                isClickable: true
            }, {
                label: "Redis",
                connectionStatus: redisStatus,
                testConnection: testRedis,
                isClickable: false
            }]
        }, [queueStatus, redisStatus, elasticsearchStatus])
    const [sources, setSources] = useState<ISource[]>(baseSources)

    const [searchParams, setSearchParams] = useSearchParams()
    const defaultSelectedSource = baseSources[0].label

    if (!searchParams.get("source")) {
        setSearchParams(prev => {
            return {
                ...prev,
                source: defaultSelectedSource
            }
        })
    }

    const selectedSource = searchParams.get("source")

    useEffect(() => {
        setSources(baseSources)
    }, [baseSources]);

    return (
        <Box sx={{m: 0, p: 2, width: "100%", height: "100%", display: "flex", gap: "2rem"}}>
            <SourcesPanel sources={sources}/>
            {selectedSource === "Queue" &&
                <QueueStatsPanel status={queueStatsPanelStatus} data={queueStatsPanelResponse} maxRate={10000}
                                 refreshData={refreshData}
                                 fetchStatus={queueStatsPanelFetchStatus}/>}
            {selectedSource == "Elasticsearch" &&
                <ElasticsearchStatsPanel status={elasticsearchStatsStatus} fetchStatus={elasticsearchStatsFetchStatus}
                                         data={elasticsearchStatsResponse} refreshData={refreshData}/>}
        </Box>
    )
}
