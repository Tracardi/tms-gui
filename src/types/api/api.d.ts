export interface IAuthResponse {
    access_token: string
}

export interface IValidationError {
    loc: [string | number],
    msg: string,
    type: string
}

export interface IDeleteFnParams {
    id: string,
}
