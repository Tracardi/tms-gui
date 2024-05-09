import {CreateTenantBody, Tenant, ValidationError} from "../../types/api";
import {AxiosResponse} from "axios";
import {fetchWithToken} from "../fetchWithToken.ts";

export interface CreateTenantParams {
    accessToken: string,
    prefixUrl: string,
    body: CreateTenantBody
}

export function createTenant({
                                 accessToken,
                                 prefixUrl,
                                 body
                             }: CreateTenantParams): Promise<AxiosResponse<Tenant, ValidationError>> {
    return fetchWithToken({
        url: `${prefixUrl}/tenant`, accessToken, options: {
            method: "POST",
            data: JSON.stringify(body)
        }
    })
}
