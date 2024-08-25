import {Stack} from "@mui/material";
import SourceConnectionCard from "./sourceConnectionCard.tsx";
import Paper from "@mui/material/Paper";
import {ISource} from "../../../pages/dashboardPage.tsx";

interface ISourcesPanel {
    sources: ISource[],
}

export default function SourcesPanel({sources}: ISourcesPanel) {

    return (
        <Paper square={false} sx={{minWidth: "360px", height: "100%", padding: "1rem"}}>
            <Stack spacing={2}>
                {sources.map((source) => {
                    return <SourceConnectionCard key={source.label} label={source.label}
                                                 connectionStatus={source.connectionStatus}
                                                 onBtnClick={() => {
                                                     source.testConnection()
                                                 }}/>
                })}
            </Stack>
        </Paper>
    )
}
