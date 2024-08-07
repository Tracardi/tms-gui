import { IValidationError} from "../../../types/api/api";
import { ICreateTenantBody, ITenant} from "../../../types/api/tenant";
import {AxiosResponse} from "axios";
import {fetchWithToken} from "../../fetchWithToken.ts";

export interface CreateTenantParams {
    accessToken: string,
    prefixUrl: string,
    body: ICreateTenantBody
}

export function createTenant({
                                 accessToken,
                                 prefixUrl,
                                 body
                             }: CreateTenantParams): Promise<AxiosResponse<ITenant, IValidationError>> {
    return fetchWithToken({
        url: `${prefixUrl}/tenant`, accessToken, options: {
            method: "POST",
            data: JSON.stringify(body)
        }
    })
}
