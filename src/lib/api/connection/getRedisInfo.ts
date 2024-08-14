import {fetchWithToken} from "../../fetchWithToken.ts";
import {IGetDefaultInfo} from "./getDefaultInfo.ts";

export function getRedisInfo({prefixUrl, accessToken}: IGetDefaultInfo) {
    const url = `${prefixUrl}/redis/info`

    return fetchWithToken({url, accessToken})
}
