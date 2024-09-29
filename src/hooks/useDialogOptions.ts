import {useState} from "react";

interface DialogOptions {
    open: boolean,
    selected?: string
}

export default function useDialogOptions() {

    const [dialogOptions, setDialogOptions] = useState<DialogOptions>({
        open: false,
        selected: ""
    })

    const closeDialog = () => {
        setDialogOptions({open: false, selected: ""})
    }

    const openDialog = (selected: string) => {
        setDialogOptions({open: true, selected})
    }

    return {dialogOptions, openDialog, closeDialog}
}
