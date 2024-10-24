import axios from "axios";

export function fetchWithToken(url: string, options?: object) {

    const accessToken = localStorage.getItem("accessToken") || ""
    const apiPrefix = localStorage.getItem("apiPrefix") || ""

    const config = {
        ...options,
        url: apiPrefix + url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    }

    return axios.request(config)
}
