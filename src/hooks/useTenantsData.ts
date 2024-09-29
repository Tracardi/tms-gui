import useApiAuthContext from "./useApiAuthContext.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getTenants} from "../lib/api/tenant/getTenants.ts";
import {useState} from "react";
import {createTenant} from "../lib/api/tenant/createTenant.ts";
import {deleteTenant} from "../lib/api/tenant/deleteTenant.ts";
import {ITenant} from "../types/api/tenant";
import useDialogOptions from "./useDialogOptions.ts";

export default function useTenantsData() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {dialogOptions, closeDialog, openDialog} = useDialogOptions()
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [selectedTenant, setSelectedTenant] = useState<ITenant | null>(null)

    const queryClient = useQueryClient()
    const {data, status, error} = useQuery({
        queryKey: ["tenants"], queryFn: () => {
            return getTenants({prefixUrl: apiPrefix, accessToken: accessToken})
        },
    })

    const createTenantMutation = useMutation({
        mutationFn: createTenant,
        onSuccess: (_res, variables) => {
            const prevTenants = data!.data.filter(tenant => tenant.id !== variables.body.id)

            const tenants = [...prevTenants, variables.body]
            const updater = {...data, data: tenants}

            queryClient.setQueryData(["tenants"], updater)
            closeDialog()
        }
    })

    const deleteTenantMutation = useMutation({
        mutationFn: deleteTenant,
        onSuccess: (_res, variables) => {
            const tenants = data!.data.filter(tenant => tenant.id !== variables.id)
            const updater = {...data, data: tenants}

            queryClient.setQueryData(["tenants"], updater)
            closeDialog()
        }
    })

    const createTenantHandler = (tenant: ITenant) => {
        createTenantMutation.mutate({
            accessToken,
            prefixUrl: apiPrefix,
            body: tenant
        })
    }

    const deleteTenantHandler = () => {
        selectedIds.forEach(id => {
            deleteTenantMutation.mutate({
                id,
                accessToken,
                prefixUrl: apiPrefix
            })
        })
        setSelectedIds([])
    }

    return {
        data,
        status,
        error,
        selectedIds,
        selectedTenant,
        setSelectedIds,
        setSelectedTenant,
        createTenantHandler,
        deleteTenantHandler,
        createMutation: {
            ...createTenantMutation
        },
        deleteMutation: {
            ...deleteTenantMutation
        },
        dialogOptions,
        openDialog,
        closeDialog
    }
}
