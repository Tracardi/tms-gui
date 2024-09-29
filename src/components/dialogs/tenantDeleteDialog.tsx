import DataDialog from "./DataDialog.tsx";
import {DialogContentText} from "@mui/material";

interface ITenantDeleteDialog {
    onDelete: () => void,
    onClose: () => void,
    open: boolean,
    isPending?: boolean
}

export default function TenantDeleteDialog({onDelete, onClose, open, isPending}: ITenantDeleteDialog) {

    return (
        <DataDialog title={"Delete Tenant?"} open={open} onClose={onClose} onSubmit={onDelete} isForm={false}
                    isPending={isPending}>
            <DialogContentText>
                Tenant will be deleted permanently.
            </DialogContentText>
        </DataDialog>
    )
}
