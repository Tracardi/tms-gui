export interface Tenant {
    id: string,
    created: string,
    name: string,
    install_token: string,
    email: string,
    expire: string,
}

export interface CreateTenantBody {
    id: string,
    name: string,
    install_token: string,
    email: string,
    expire: string,
}

export interface GetTenantsError {
    detail: string
}

export interface AuthResponse {
    access_token: string
}

export interface ValidationError {
    loc: [string | number],
    msg: string,
    type: string
}

export interface DeleteFnParams {
    id: string,
    accessToken: string,
    prefixUrl: string
}
