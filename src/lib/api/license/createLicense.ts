import {IValidationError} from "../../../types/api/api";
import {AxiosResponse} from "axios";
import {fetchWithToken} from "../../fetchWithToken.ts";
import {ILicense} from "../../../types/api/license";

export interface CreateLicenseParams {
    accessToken: string,
    prefixUrl: string,
    body: ILicense
}

export function createLicense({
                                  accessToken,
                                  prefixUrl,
                                  body
                              }: CreateLicenseParams): Promise<AxiosResponse<string, IValidationError>> {
    return fetchWithToken({
        url: `${prefixUrl}/license`, accessToken, options: {
            method: "POST",
            data: JSON.stringify(body)
        }
    })
}
