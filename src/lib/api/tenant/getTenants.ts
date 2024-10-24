import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {IGetTenantsError, ITenant} from "../../../types/api/tenant";

export function getTenants(): Promise<AxiosResponse<ITenant[], IGetTenantsError>> {
    return fetchWithToken('/tenants')
}
