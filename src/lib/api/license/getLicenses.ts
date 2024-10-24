import {fetchWithToken} from "../../fetchWithToken.ts";
import {AxiosResponse} from "axios";
import {ILicense} from "../../../types/api/license";
import {IValidationError} from "../../../types/api/api";

export function getLicenses(): Promise<AxiosResponse<ILicense[], IValidationError>> {
    return fetchWithToken('/license')
}
