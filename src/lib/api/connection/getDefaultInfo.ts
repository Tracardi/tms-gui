import {fetchWithToken} from "../../fetchWithToken.ts";

export function getDefaultInfo() {
    const url = `/`

    return fetchWithToken(url)
}
