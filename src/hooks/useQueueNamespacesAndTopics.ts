import {useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import getTopics from "../lib/api/topics/getTopics.ts";

export default function useQueueNamespacesAndTopics() {

    const [searchParams, setSearchParams] = useSearchParams()

    const defaultTopic = "functions"
    const defaultNamespace = "system"

    const getSelectedTopic = () => {
        return searchParams.get("topic") || defaultTopic
    }

    const setSelectedTopic = (topic: string) => {
        setSearchParams(params => {
            params.set("topic", topic)
            return params
        })
    }

    const getSelectedNamespace = () => {
        return searchParams.get("namespace") || defaultNamespace
    }

    const setSelectedNamespace = (namespace: string) => {
        setSearchParams(params => {
            params.set("namespace", namespace)
            return params
        })
    }

    const {data, status} = useQuery({
        queryKey: ["queueTopics"], queryFn: () => {
            return getTopics()
        }
    })

    return {data, status, getSelectedTopic, getSelectedNamespace, setSelectedNamespace, setSelectedTopic}
}
