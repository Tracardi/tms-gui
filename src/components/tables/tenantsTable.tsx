import DataTable from "./dataTable/dataTable.tsx";
import {HeadCell} from "../../types/table";
import {DeleteFnParams, Tenant, ValidationError} from "../../types/api";
import {deleteTenant} from "../../lib/api/deleteTenant.ts";
import {AxiosResponse} from "axios";

interface TenantsTableProps {
    data: Tenant[],
    onRowClick: (tenant: Tenant) => void,
    onCreateBtnClick: () => void,
    onDeleteSuccess: (res: AxiosResponse<string, ValidationError>, variables: DeleteFnParams) => void,
    onDeleteError: () => void
}

export default function TenantsTable({data, onRowClick, onCreateBtnClick, onDeleteSuccess, onDeleteError}: TenantsTableProps) {

    const headCells: HeadCell<Tenant>[] = [
        {
            id: "id",
            numeric: false,
            label: "id",
            disablePadding: false,
            dateFormat: false,
        },
        {
            id: "name",
            numeric: false,
            label: "name",
            disablePadding: false,
            dateFormat: false
        },
        {
            id: "email",
            numeric: false,
            label: "email",
            disablePadding: false,
            dateFormat: false
        },
        {
            id: "created",
            numeric: false,
            label: "created at",
            disablePadding: false,
            dateFormat: true
        },
        {
            id: "expire",
            numeric: false,
            label: "expire at",
            disablePadding: false,
            dateFormat: true
        },
    ]
    const title = "Tenants Table"

    return (
        <DataTable onRowClick={onRowClick} data={data} title={title} deleteFn={deleteTenant}
                   deleteTooltipTitle="Delete tenant" editTooltipTitle="Tenant details" onDeleteError={onDeleteError}
                   onDeleteSuccess={onDeleteSuccess} onCreateBtnClick={onCreateBtnClick} headCells={headCells}
                   warningDialogText="The tenant/tenants data will be erased."
                   warningDialogTitle="Delete Tenant/Tenants"/>
    )
}
