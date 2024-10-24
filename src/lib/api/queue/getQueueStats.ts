import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IQueueStats} from "../../../types/api/queue";
import {IValidationError} from "../../../types/api/api";
import {defaultQueueNamespace, defaultQueueTopic} from "../../constants.ts";

export function getQueueStats(namespace = defaultQueueNamespace, topic = defaultQueueTopic): Promise<AxiosResponse<IQueueStats, IValidationError>> {

    return fetchWithToken(`/queue/${namespace}/${topic}/stats`)
}
