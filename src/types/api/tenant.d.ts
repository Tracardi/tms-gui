export interface ITenant {
    id: string,
    created: string,
    name: string,
    install_token: string,
    email: string,
    expire: string,
}

export interface ICreateTenantBody {
    id: string,
    name: string,
    install_token: string,
    email: string,
    expire: string,
}

export interface IGetTenantsError {
    detail: string
}
