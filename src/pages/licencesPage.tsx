import useLicensesData from "../hooks/useLicensesData.ts";
import StatusWrapper from "../components/dashboard/statusWrapper.tsx";
import {Box} from "@mui/material";
import {DataTable} from "mui-table-widget";
import {HeadCell} from "../types/ui/table";
import {ILicense} from "../types/api/license";
import LicenseFormDialog from "../components/dialogs/licenseFormDialog.tsx";
import LicenseDeleteDialog from "../components/dialogs/licenseDeleteDialog.tsx";

export default function LicencesPage() {

    const {
        status,
        data,
        selectedIds,
        setSelectedIds,
        setSelectedLicense,
        dialogOptions,
        closeDialog,
        openDialog,
        selectedLicense,
        deleteLicenseHandler,
        createMutation,
        createLicenseHandler,
        deleteMutation
    } = useLicensesData()

    if (status !== "success") {
        return <StatusWrapper status={status}/>
    }

    const licenses = data!.data
    const headCells: HeadCell<ILicense>[] = [
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
            id: "description",
            disablePadding: false,
            label: "Description",
            dataFormat: "string",
        }, {
            id: "created",
            disablePadding: false,
            label: "Created",
            dataFormat: "date",
        },
        {
            id: "license",
            disablePadding: false,
            label: "License",
            dataFormat: "string",
        },
        {
            id: "license_expire",
            disablePadding: false,
            label: "Expire",
            dataFormat: "date",
        },
    ]

    const onCreateClick = () => {
        setSelectedLicense(null)
        openDialog("form")
    }

    const onDeleteClick = () => {
        openDialog("delete")
    }

    const onRowClick = (license: ILicense) => {
        setSelectedLicense(license)
        openDialog("form")
    }

    const createComponent = (
        <LicenseFormDialog open={dialogOptions.open && dialogOptions.selected === "form"}
                           onClose={closeDialog} onUpdate={createLicenseHandler} data={selectedLicense}
                           isPending={createMutation.isPending}/>
    )

    const deleteComponent = (
        <LicenseDeleteDialog onDelete={deleteLicenseHandler} onClose={closeDialog} isPending={deleteMutation.isPending}
                             open={dialogOptions.open && dialogOptions.selected === "delete"}/>
    )

    return (
        <Box sx={{p: 2}}>
            <DataTable data={licenses} title={"Licenses Table"} selected={selectedIds}
                       setSelected={setSelectedIds} onDeleteClick={onDeleteClick} onCreateClick={onCreateClick}
                       createComponent={createComponent}
                       deleteComponent={deleteComponent} onRowClick={onRowClick} headCells={headCells}/>
        </Box>
    )
}
