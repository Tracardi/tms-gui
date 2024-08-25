import Box from "@mui/material/Box";
import {useEffect, useMemo, useState} from "react";
import useConnection from "../lib/api/connection/useConnection.ts";
import {getQueueStats} from "../lib/api/queue/getQueueStats.ts";
import SourcesPanel from "../components/dashboard/sources/sourcesPanel.tsx";
import {getRedisInfo} from "../lib/api/connection/getRedisInfo.ts";
import {Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {getElasticsearchInfo} from "../lib/api/connection/getElasticsearchInfo.ts";
import Paper from "@mui/material/Paper";

export interface ISource {
    label: string,
    connectionStatus: "success" | "pending" | "idle" | "error",
    testConnection: () => void,
    isClickable: boolean
}

export default function DashboardPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const {status: queueStatus, testConnection: testQueue} = useConnection({mutationFn: getQueueStats})
    const {
        status: elasticsearchStatus,
        testConnection: testElasticsearch
    } = useConnection({mutationFn: getElasticsearchInfo})
    const {status: redisStatus, testConnection: testRedis} = useConnection({mutationFn: getRedisInfo})

    const
        baseSources: ISource[] = useMemo(() => {
            return [{
                label: "elasticsearch",
                connectionStatus: elasticsearchStatus,
                testConnection: testElasticsearch,
                isClickable: true
            }, {
                label: "queue",
                connectionStatus: queueStatus,
                testConnection: testQueue,
                isClickable: true
            }, {
                label: "redis",
                connectionStatus: redisStatus,
                testConnection: testRedis,
                isClickable: false
            }]
        }, [queueStatus, redisStatus, elasticsearchStatus])

    const [sources, setSources] = useState<ISource[]>(baseSources)

    const defaultSelectedSource = baseSources[0].label
    const defaultRefreshTime = 10000

    if (location.pathname === "/") {
        navigate(`/${defaultSelectedSource}`)
    }

    if (!searchParams.has("refreshTime")) {
        setSearchParams(prev => {
            return {...prev, "refreshTime": defaultRefreshTime}
        })
    }

    useEffect(() => {
        setSources(baseSources)
    }, [baseSources]);

    return (
        <Box sx={{m: 0, p: 2, width: "100%", height: "100%", display: "flex", gap: "2rem"}}>
            <SourcesPanel sources={sources}/>
            <Paper sx={{
                minWidth: "500px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                flex: "1 0 0",
                overflow: "scroll",
                padding: "0 2rem 1rem 2rem",
                gap: "1rem",
            }}>
                <Outlet/>
            </Paper>
        </Box>
    )
}
