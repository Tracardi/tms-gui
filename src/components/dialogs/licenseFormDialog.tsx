import DataDialog from "./DataDialog.tsx";
import {ILicense} from "../../types/api/license";
import {SubmitHandler, useForm} from "react-hook-form";
import {Grid, TextField} from "@mui/material";
import {useEffect} from "react";

interface ILicenseFormDialog {
    open: boolean,
    onClose: () => void,
    onUpdate: (license: ILicense) => void,
    isPending?: boolean,
    data: ILicense | null
}

interface Inputs {
    id: string,
    name: string,
    license: string,
    description: string,
    email: string,
    license_expire: string
}

export default function LicenseFormDialog({open, onClose, data, onUpdate, isPending = false}: ILicenseFormDialog) {

    const initialData = data ? data : {
        id: "",
        created: "",
        name: "",
        license: "",
        description: "",
        email: "",
        license_expire: ""
    }

    const {
        register, handleSubmit
        , reset, formState
    } = useForm<Inputs>()

    useEffect(() => {
        reset()
    }, [open, reset]);

    const {errors} = formState

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        const created = initialData.created ? initialData.created : new Date().toISOString()
        const license: ILicense = {...formData, created}
        onUpdate(license)

        onClose()
    }

    return (
        <DataDialog isPending={isPending} title="License Form" open={open} onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{padding: "0.4rem 0"}}>
                <Grid item xs={6}>
                    <TextField label="License id" fullWidth inputProps={{readOnly: !!data}}
                               defaultValue={initialData.id} {...register("id", {required: "Id is required"})}
                               error={!!errors.id} helperText={errors.id?.message}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="License name" fullWidth defaultValue={initialData.name} error={!!errors.name}
                               helperText={errors.name?.message}
                               {...register("name", {required: "Name is required"})} />
                </Grid>
                <Grid item xs={4}>
                    <TextField label="License" error={!!errors.license}
                               helperText={errors.license?.message}
                               defaultValue={initialData.license} {...register("license", {required: "License is required"})} />
                </Grid>
                <Grid item xs={8}>
                    <TextField type="email" label="License email" error={!!errors.email}
                               helperText={errors.email?.message} fullWidth
                               defaultValue={initialData.email} {...register("email", {required: "Email is required"})} />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" fullWidth error={!!errors.description}
                               helperText={errors.description?.message} label="Description"
                               defaultValue={initialData.description} {...register("description", {required: "Description is required"})}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="datetime-local" fullWidth error={!!errors.license_expire}
                               helperText={errors.license_expire?.message} label={data ? "expire date" : null}
                               defaultValue={initialData.license_expire} {...register("license_expire", {required: "Expire date is required"})}/>
                </Grid>
            </Grid>
        </DataDialog>
    )
}
