import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IDeleteFnParams, IValidationError} from "../../../types/api/api";

export function deleteTenant({
                                 prefixUrl,
                                 accessToken,
                                 id
                             }: IDeleteFnParams): Promise<AxiosResponse<string, IValidationError>> {
    return fetchWithToken({
        url: `${prefixUrl}/tenant/${id}`, accessToken, options: {
            method: "DELETE"
        }
    })
}
