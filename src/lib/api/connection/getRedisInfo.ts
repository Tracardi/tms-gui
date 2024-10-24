import {fetchWithToken} from "../../fetchWithToken.ts";

export function getRedisInfo() {
    const url = "/redis/info"

    return fetchWithToken(url)
}
