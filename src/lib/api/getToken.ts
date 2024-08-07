import axios, {AxiosResponse} from "axios";
import {IAuthResponse, IValidationError} from "../../types/api/api";

interface GetTokenParams {
    prefixUrl: string,
    apiKey: string
}

export function getToken({prefixUrl, apiKey}: GetTokenParams): Promise<AxiosResponse<IAuthResponse, IValidationError>> {

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${prefixUrl}/api-key/${apiKey}`,
        headers: {}
    }

    return axios.request(config)
}
