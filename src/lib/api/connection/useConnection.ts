import useApiAuthContext from "../../../hooks/useApiAuthContext.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {useEffect} from "react";

interface IUseConnection {
    mutationFn: ({prefixUrl, accessToken}: { prefixUrl: string, accessToken: string }) => Promise<AxiosResponse>
}

export default function useConnection({mutationFn}: IUseConnection) {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {mutate, status} = useMutation({mutationFn: mutationFn})

    useEffect(() => {
        mutate({prefixUrl: apiPrefix, accessToken})
    }, [])

    const testConnection = () => {
        mutate({prefixUrl: apiPrefix, accessToken})
    }

    return {status, testConnection}
}
