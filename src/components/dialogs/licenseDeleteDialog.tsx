import DataDialog from "./DataDialog.tsx";
import {DialogContentText} from "@mui/material";

interface ILicenseDeleteDialog {
    onDelete: () => void,
    onClose: () => void,
    open: boolean,
    isPending?: boolean
}

export default function LicenseDeleteDialog({onDelete, onClose, open, isPending}: ILicenseDeleteDialog) {

    return (
        <DataDialog title={"Delete License?"} open={open} onClose={onClose} onSubmit={onDelete} isForm={false}
                    isPending={isPending}>
            <DialogContentText>
                License will be deleted permanently.
            </DialogContentText>
        </DataDialog>
    )
}
