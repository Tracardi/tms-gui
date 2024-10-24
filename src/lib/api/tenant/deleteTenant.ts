import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IDeleteFnParams, IValidationError} from "../../../types/api/api";

export function deleteTenant({
                                 id
                             }: IDeleteFnParams): Promise<AxiosResponse<string, IValidationError>> {
    return fetchWithToken(`/tenant/${id}`, {
            method: "DELETE"
        }
    )
}
