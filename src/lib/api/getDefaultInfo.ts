import {fetchWithToken} from "../fetchWithToken.ts";

interface IGetDefaultInfo {
    prefixUrl: string,
    accessToken: string
}

export function getDefaultInfo({prefixUrl, accessToken}: IGetDefaultInfo) {
    const url = `${prefixUrl}/`

    return fetchWithToken({url, accessToken})
}
