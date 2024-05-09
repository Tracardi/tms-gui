import {fetchWithToken} from "../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {DeleteFnParams, ValidationError} from "../../types/api";

export function deleteTenant({
                                 prefixUrl,
                                 accessToken,
                                 id
                             }: DeleteFnParams): Promise<AxiosResponse<string, ValidationError>> {
    return fetchWithToken({
        url: `${prefixUrl}/tenant/${id}`, accessToken, options: {
            method: "DELETE"
        }
    })
}
