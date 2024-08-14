import {fetchWithToken} from "../../fetchWithToken.ts";
import {IGetDefaultInfo} from "./getDefaultInfo.ts";

export function getElasticsearchInfo({prefixUrl, accessToken}: IGetDefaultInfo) {
    const url = `${prefixUrl}/elasticsearch/info`

    return fetchWithToken({url, accessToken})
}
