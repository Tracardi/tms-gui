import {fetchWithToken} from "../../fetchWithToken.ts";


export function getElasticsearchInfo() {
    const url = `/elasticsearch/info`

    return fetchWithToken(url)
}
