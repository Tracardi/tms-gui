import {useSearchParams} from "react-router-dom";

export default function useRefreshTime() {
    const [searchParams, setSearchParams] = useSearchParams()

    const getRefreshTime = () => {
        return parseInt(searchParams.get("refreshTime") || "0") || 10000
    }

    const setRefreshTime = (time: number | string) => {
        setSearchParams(params => {
            params.set("refreshTime", time.toString())
            return params
        })
    }

    return {getRefreshTime, setRefreshTime}
}
