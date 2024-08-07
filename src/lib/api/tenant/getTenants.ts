import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IGetTenantsError, ITenant} from "../../../types/api/tenant";

interface GetTenantsParams {
    prefixUrl: string,
    accessToken: string
}

export function getTenants({prefixUrl, accessToken}: GetTenantsParams): Promise<AxiosResponse<ITenant[], IGetTenantsError>> {
    return fetchWithToken({url: `${prefixUrl}/tenants`, accessToken})
}
