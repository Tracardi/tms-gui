import {useSearchParams} from "react-router-dom";

export default function useRefreshTime() {
    const [searchParams, setSearchParams] = useSearchParams()

    const getRefreshTime = () => {
        return parseInt(searchParams.get("refreshTime") || "0") || 10000
    }

    const setRefreshTime = (time: number | string) => {
        setSearchParams(prev => {
            return {...prev, "refreshTime": time}
        })
    }

    return {getRefreshTime, setRefreshTime}
}
