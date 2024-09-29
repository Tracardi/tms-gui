import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {ReactNode} from "react";

interface IDataDialog {
    title: string,
    open: boolean,
    onClose: () => void,
    onSubmit: () => void,
    children: ReactNode,
    isPending?: boolean
    isForm?: boolean
}

export default function DataDialog({
                                       title,
                                       open,
                                       onClose,
                                       onSubmit,
                                       children,
                                       isForm = true,
                                       isPending = false
                                   }: IDataDialog) {

    return (
        <Dialog open={open} onClose={onClose} component={isForm ? "form" : "div"}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button type={"button"} onClick={onClose}>Close</Button>
                <Button disabled={isPending} onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
