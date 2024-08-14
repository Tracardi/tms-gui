import Paper, {PaperProps} from "@mui/material/Paper";
import {useTheme} from "@mui/material/styles";

export default function DashboardPaperCard(props: PaperProps) {
    const {palette} = useTheme()
    const {sx, children, square = false} = props

    return (
        <Paper {...props} sx={{bgcolor: palette.background.default, ...sx}} square={square}>
            {children}
        </Paper>
    )
}
