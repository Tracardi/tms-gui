import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IDeleteFnParams, IValidationError} from "../../../types/api/api";

export function deleteLicense({
                                  id
                              }: IDeleteFnParams): Promise<AxiosResponse<string, IValidationError>> {
    return fetchWithToken(`/license/${id}`, {
            method: "DELETE"
        }
    )
}
