import {Box, Typography, Button, Stack} from "@mui/material"
import {Circle} from "@mui/icons-material";
import DashboardPaperCard from "../ui/dashboardPaperCard.tsx";

type ConnectionStatus = "success" | "pending" | "error" | "idle"
type DominatingColor = "success" | "warning" | "error"

interface IConnectionCard {
    label: string,
    connectionStatus: ConnectionStatus,
    onClick: () => void,
}

function getStatusObject(status: ConnectionStatus): { color: DominatingColor, text: string } {

    if (status === "success") {
        return {
            color: "success",
            text: "online"
        }
    }

    if (status === "error") {
        return {
            color: "error",
            text: "offline"
        }
    }

    if (status === "pending" || status === "idle") {
        return {
            color: "warning",
            text: "pending"
        }
    }

    return {
        color: "warning",
        text: "",
    }
}

export default function SourceConnectionCard({label, connectionStatus, onClick}: IConnectionCard) {

    const {text, color} = getStatusObject(connectionStatus)
    const isLoading = connectionStatus === "pending" || connectionStatus === "idle"

    return (
        <DashboardPaperCard sx={{padding: "1rem 1.4rem"}}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={1}>
                <Typography variant={"subtitle1"}>{label}</Typography>
                <Box sx={{display: "flex", gap: "0.8rem", alignItems: "center", marginLeft: "100%"}}>
                    <Circle color={color}/>
                    <Typography>{text}</Typography>
                    <Button onClick={onClick} variant={"text"} disabled={isLoading} size={"small"}>Test</Button>
                </Box>
            </Stack>
        </DashboardPaperCard>
    )
}
