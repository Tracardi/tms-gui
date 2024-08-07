import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IQueueStats} from "../../../types/api/queue";
import {IValidationError} from "../../../types/api/api";

interface GetQueueStatsParams {
    prefixUrl: string,
    accessToken: string,
}

export function getQueueStats({
                                  prefixUrl,
                                  accessToken
                              }: GetQueueStatsParams): Promise<AxiosResponse<IQueueStats, IValidationError>> {

    return fetchWithToken({url: `${prefixUrl}/queue/system/functions/stats`, accessToken})
}
