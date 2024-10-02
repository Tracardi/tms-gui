import {Box} from "@mui/material";
import {DataTable} from "mui-table-widget"
import {ITenant} from "../types/api/tenant";
import StatusWrapper from "../components/dashboard/statusWrapper.tsx";
import useTenantsData from "../hooks/useTenantsData.ts";
import TenantFormDialog from "../components/dialogs/tenantFormDialog.tsx";
import TenantDeleteDialog from "../components/dialogs/tenantDeleteDialog.tsx";
import {HeadCell} from "../types/ui/table";


export default function TenantsPage() {

    const {
        status,
        data,
        selectedIds,
        selectedTenant,
        setSelectedIds,
        setSelectedTenant,
        createTenantHandler,
        deleteTenantHandler, createMutation, deleteMutation,
        dialogOptions, openDialog, closeDialog
    } = useTenantsData()

    if (status !== "success") {
        return <StatusWrapper status={status}/>
    }

    const tenants = data!.data
    const headCells: HeadCell<ITenant>[] = [
        {
            disablePadding: false,
            id: "id",
            label: "ID",
            dataFormat: "string",
        }, {
            id: "name",
            disablePadding: false,
            label: "Name",
            dataFormat: "string",
        }, {
            id: "email",
            disablePadding: false,
            label: "Email",
            dataFormat: "string",
        }, {
            id: "install_token",
            disablePadding: false,
            label: "Install Token",
            dataFormat: "string",
        }, {
            id: "created",
            disablePadding: false,
            label: "Created",
            dataFormat: "date",
        },
        {
            id: "expire",
            disablePadding: false,
            label: "Expire",
            dataFormat: "date",
        },
    ]

    const onCreateClick = () => {
        setSelectedTenant(null)
        openDialog("form")
    }

    const onDeleteClick = () => {
        openDialog("delete")
    }

    const onRowClick = (tenant: ITenant) => {
        setSelectedTenant(tenant)
        openDialog("form")
    }

    const createComponent = (
        <TenantFormDialog open={dialogOptions.open && dialogOptions.selected === "form"} onClose={closeDialog}
                          onUpdate={createTenantHandler} data={selectedTenant} isPending={createMutation.isPending}/>
    )

    const deleteComponent = (
        <TenantDeleteDialog onDelete={deleteTenantHandler} onClose={closeDialog} isPending={deleteMutation.isPending}
                            open={dialogOptions.open && dialogOptions.selected === "delete"}/>
    )

    return (
        <Box sx={{p: 2}}>
            <DataTable data={tenants} title={"Tenants Table"} selected={selectedIds}
                       setSelected={setSelectedIds} onDeleteClick={onDeleteClick} onCreateClick={onCreateClick}
                       createComponent={createComponent}
                       deleteComponent={deleteComponent} onRowClick={onRowClick} headCells={headCells}
            />
        </Box>
    )
}
