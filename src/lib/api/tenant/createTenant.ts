import {IValidationError} from "../../../types/api/api";
import {ICreateTenantBody, ITenant} from "../../../types/api/tenant";
import {AxiosResponse} from "axios";
import {fetchWithToken} from "../../fetchWithToken.ts";

export interface CreateTenantParams {
    body: ICreateTenantBody
}

export function createTenant({
                                 body
                             }: CreateTenantParams): Promise<AxiosResponse<ITenant, IValidationError>> {
    return fetchWithToken(
        '/tenant', {
            method: "POST",
            data: JSON.stringify(body)
        }
    )
}
