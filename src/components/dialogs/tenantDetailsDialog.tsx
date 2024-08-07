import DetailsDialog from "./detailsDialog.tsx";
import {TextField} from "@mui/material";
import { IValidationError} from "../../types/api/api";
import {ITenant} from "../../types/api/tenant";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {createTenant, CreateTenantParams} from "../../lib/api/tenant/createTenant.ts";
import useApiAuthContext from "../../hooks/useApiAuthContext.ts";
import Typography from "@mui/material/Typography";
import {AxiosResponse} from "axios";
import Grid from "@mui/material/Unstable_Grid2";

interface TenantDialogProps {
    open: boolean,
    onClose: () => void,
    onSuccess: (data: AxiosResponse<ITenant, IValidationError>, variables: CreateTenantParams) => void,
    onError: () => void
    value: ITenant | null
}

interface Inputs {
    id: string,
    name: string,
    install_token: string,
    email: string,
    expire: string
}

export default function TenantDetailsDialog({open, onClose, value, onSuccess, onError}: TenantDialogProps) {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const title = value ? "Tenant details" : "Tenant creation"
    const initialData = value ? value : {
        expire: "",
        email: "",
        install_token: "",
        name: "",
        id: "",
        created: ""
    }

    const {register, handleSubmit, reset, formState, } = useForm<Inputs>()
    const {errors  } = formState

    const mutation = useMutation({
        mutationFn: createTenant,
        onSuccess: onSuccess,
        onError: onError
    })

    useEffect(() => {
        reset() // resetting input values when open is changing to have properly working default values
    }, [open])

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.reset()
        mutation.mutate({prefixUrl: apiPrefix, accessToken, body: data})
    }

    return (
        <DetailsDialog open={open} onSubmit={handleSubmit(onSubmit)} title={title} onClose={onClose} isPending={mutation.isPending}>
            <Grid container spacing={2} sx={{padding: "0.4rem 0"}}>
                <Grid xs={6}>
                    <TextField label="Tenant id" fullWidth inputProps={{readOnly: value !== null}}
                               defaultValue={initialData.id} {...register("id", {required: "Id is required"})}
                               error={!!errors.id} helperText={errors.id?.message}/>
                </Grid>
                <Grid xs={6}>
                    <TextField label="Tenant name" fullWidth defaultValue={initialData.name} error={!!errors.name}
                               helperText={errors.name?.message}
                               {...register("name", {required: "Name is required"})} />
                </Grid>
                <Grid xs={4}>
                    <TextField label="Install token" error={!!errors.install_token}
                               helperText={errors.install_token?.message}
                               defaultValue={initialData.install_token} {...register("install_token", {required: "Install token is required"})} />
                </Grid>
                <Grid xs={8}>
                    <TextField type="email" label="Tenant email" error={!!errors.email}
                               helperText={errors.email?.message} fullWidth
                               defaultValue={initialData.email} {...register("email", {required: "Email is required"})} />
                </Grid>
                <Grid xs={12}>
                    <TextField type="datetime-local" fullWidth error={!!errors.expire} helperText={errors.expire?.message} label={value ? "expire date" : null}
                               defaultValue={initialData.expire} {...register("expire", {required: "Expire date is required"})}/>
                </Grid>
            </Grid>
            {mutation.isError && value === null && <Typography color="error"> Could not create tenant</Typography>}
            {mutation.isError && value !== null && <Typography color="error"> Could not update tenant</Typography>}
        </DetailsDialog>
    )
}
