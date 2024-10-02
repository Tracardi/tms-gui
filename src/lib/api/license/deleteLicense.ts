import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IDeleteFnParams, IValidationError} from "../../../types/api/api";

export function deleteLicense({
                                 prefixUrl,
                                 accessToken,
                                 id
                             }: IDeleteFnParams): Promise<AxiosResponse<string, IValidationError>> {
    return fetchWithToken({
        url: `${prefixUrl}/license/${id}`, accessToken, options: {
            method: "DELETE"
        }
    })
}
