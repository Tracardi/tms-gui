import {Alert, Snackbar, SnackbarOrigin} from "@mui/material";
import {SnackbarData} from "../../types/ui/snackbar";

interface SnackbarWithAlertProps {
    open: boolean,
    handleClose: () => void,
    snackbarData: SnackbarData,
    origin: SnackbarOrigin
}

export default function SnackbarWithAlert({open, handleClose, snackbarData, origin} : SnackbarWithAlertProps) {

    const {content, severity} = snackbarData

    return (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} anchorOrigin={origin}>
            <Alert variant="outlined" severity={severity} onClose={handleClose}>
                {content}
            </Alert>
        </Snackbar>
    )
}
