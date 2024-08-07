import Paper from "@mui/material/Paper";
import {ReactNode} from "react";
import {SxProps, Theme} from "@mui/system";
import {useTheme} from "@mui/material/styles";

interface DashboardPaperCard {
    children?: ReactNode,
    sx?: SxProps<Theme>,
    square?: boolean
}

export default function DashboardPaperCard({sx, children, square = false}: DashboardPaperCard) {
    const {palette} = useTheme()

    return (
        <Paper sx={{bgcolor: palette.background.default, ...sx}} square={square}>
            {children}
        </Paper>
    )
}
