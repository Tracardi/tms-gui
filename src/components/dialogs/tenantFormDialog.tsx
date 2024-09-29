import DataDialog from "./DataDialog.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {Grid, TextField} from "@mui/material";
import {useEffect} from "react";
import {ITenant} from "../../types/api/tenant";

interface ITenantFormDialog {
    open: boolean,
    onClose: () => void,
    onUpdate: (tenant: ITenant) => void,
    isPending?: boolean,
    data: ITenant | null
}

interface Inputs {
    id: string,
    name: string,
    install_token: string,
    email: string,
    expire: string
}

export default function TenantFormDialog({open, onClose, data, onUpdate, isPending = false}: ITenantFormDialog) {

    const initialData = data ? data : {
        id: "",
        created: "",
        name: "",
        install_token: "",
        email: "",
        expire: ""
    }
    const {
        register, handleSubmit
        , reset, formState
    } = useForm<Inputs>()

    const {errors} = formState

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        const created = initialData.created ? initialData.created : new Date().toISOString()
        const tenant: ITenant = {...formData, created}
        onUpdate(tenant)

        onClose()
    }

    useEffect(() => {
        reset()
    }, [open, reset]);

    return (
        <DataDialog isPending={isPending} title={"Tenant Form"} open={open} onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{padding: "0.4rem 0"}}>
                <Grid item xs={6}>
                    <TextField label="Tenant id" fullWidth inputProps={{readOnly: !!data}}
                               defaultValue={initialData.id} {...register("id", {required: "Id is required"})}
                               error={!!errors.id} helperText={errors.id?.message}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Tenant name" fullWidth defaultValue={initialData.name} error={!!errors.name}
                               helperText={errors.name?.message}
                               {...register("name", {required: "Name is required"})} />
                </Grid>
                <Grid item xs={4}>
                    <TextField label="Install token" error={!!errors.install_token}
                               helperText={errors.install_token?.message}
                               defaultValue={initialData.install_token} {...register("install_token", {required: "Install token is required"})} />
                </Grid>
                <Grid item xs={8}>
                    <TextField type="email" label="Tenant email" error={!!errors.email}
                               helperText={errors.email?.message} fullWidth
                               defaultValue={initialData.email} {...register("email", {required: "Email is required"})} />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="datetime-local" fullWidth error={!!errors.expire}
                               helperText={errors.expire?.message} label={data ? "expire date" : null}
                               defaultValue={initialData.expire} {...register("expire", {required: "Expire date is required"})}/>
                </Grid>
            </Grid>
        </DataDialog>
    )
}
