import {IValidationError} from "../../../types/api/api";
import {AxiosResponse} from "axios";
import {fetchWithToken} from "../../fetchWithToken.ts";
import {ILicense} from "../../../types/api/license";

export interface CreateLicenseParams {
    body: ILicense
}

export function createLicense({
                                  body
                              }: CreateLicenseParams): Promise<AxiosResponse<string, IValidationError>> {
    return fetchWithToken(
        '/license', {
            method: "POST",
            data: JSON.stringify(body)
        }
    )
}
