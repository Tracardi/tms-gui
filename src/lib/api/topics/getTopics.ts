import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IValidationError} from "../../../types/api/api";

interface ITopic extends Array<[string, string]> {}

export default function getTopics(): Promise<AxiosResponse<ITopic, IValidationError>> {
    return fetchWithToken("/queue/topics")
}
