import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import {ReactNode} from "react";


interface DetailsDialogProps {
    open: boolean,
    onClose: () => void,
    onSubmit: () => void,
    title: string,
    isForm?: boolean,
    isPending?: boolean,
    children: ReactNode
}

export default function DetailsDialog({
                                          open,
                                          onClose,
                                          title,
                                          onSubmit,
                                          children,
                                          isForm = true,
                                          isPending = false,
                                      }: DetailsDialogProps) {

    return (
        <Dialog open={open} onClose={onClose} component={isForm ? "form" : "div"} onSubmit={isForm ? onSubmit : () => {
        }}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent sx={{minWidth: "600px"}}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button type="button" onClick={onClose}>Close</Button>
                <Button disabled={isPending} type="submit" onClick={isForm ? () => {} : onSubmit}>
                    {isPending ? <CircularProgress size={20}/> : "Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
