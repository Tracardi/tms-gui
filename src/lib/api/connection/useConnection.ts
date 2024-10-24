import {useMutation} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {useEffect} from "react";

interface IUseConnection {
    mutationFn: () => Promise<AxiosResponse>
}

export default function useConnection({mutationFn}: IUseConnection) {
    const {mutate, status} = useMutation({mutationFn: mutationFn})

    useEffect(() => {
        mutate()
    }, [])

    const testConnection = () => {
        mutate()
    }

    return {status, testConnection}
}
