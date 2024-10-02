import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {ILicense} from "../../../types/api/license";
import {IValidationError} from "../../../types/api/api";

interface GetLicenseParams {
    prefixUrl: string,
    accessToken: string
}

export function getLicenses({
                                prefixUrl,
                                accessToken
                            }: GetLicenseParams): Promise<AxiosResponse<ILicense[], IValidationError>> {
    return fetchWithToken({url: `${prefixUrl}/license`, accessToken})
}
