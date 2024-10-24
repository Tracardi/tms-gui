import {useQuery} from "@tanstack/react-query";
import {getQueueStats} from "../lib/api/queue/getQueueStats.ts";
import {defaultQueueNamespace, defaultQueueTopic, defaultRefreshTime} from "../lib/constants.ts";


export default function useQueueStatsData(refreshTime = defaultRefreshTime, namespaceWithTopic = `${defaultQueueNamespace}/${defaultQueueTopic}`) {

    const [namespace, topic] = namespaceWithTopic.split("/")

    const {data, status, fetchStatus} = useQuery({
        queryKey: ["queueStats", namespace, topic], queryFn: () => {
            return getQueueStats(namespace, topic)
        }, refetchInterval: refreshTime
    })

    return {data, status, fetchStatus}
}
