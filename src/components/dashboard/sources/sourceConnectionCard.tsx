import {Box, Typography, Button, Stack} from "@mui/material"
import {Circle} from "@mui/icons-material";
import DashboardPaperCard from "../../ui/dashboardPaperCard.tsx";
import {useTheme} from "@mui/material/styles";
import {useLocation, useNavigate} from "react-router-dom";
import useRefreshTime from "../../../hooks/useRefreshTime.ts";

type ConnectionStatus = "success" | "pending" | "error" | "idle"
type DominatingColor = "success" | "warning" | "error"

interface IConnectionCard {
    label: string,
    connectionStatus: ConnectionStatus,
    onBtnClick: () => void,
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

export default function SourceConnectionCard({label, connectionStatus, onBtnClick}: IConnectionCard) {

    const {palette,} = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const {getRefreshTime} = useRefreshTime()

    const {text, color,} = getStatusObject(connectionStatus)
    const isLoading = connectionStatus === "pending" || connectionStatus === "idle"

    const isActive = location.pathname.replace("/", "") === label
    const activeColor = isActive ? palette.secondary[palette.mode] : palette.background.default

    const clickHandler = () => {
        navigate(`/${label}?refreshTime=${getRefreshTime()}`)
    }

    return (
        <DashboardPaperCard onClick={clickHandler}
                            sx={{padding: "1rem 1.4rem", cursor: "pointer", bgcolor: activeColor}}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                   spacing={1}>
                <Typography sx={{textTransform: "capitalize"}} variant={"subtitle1"}>{label}</Typography>
                <Box sx={{display: "flex", gap: "0.8rem", alignItems: "center", marginLeft: "100%"}}>
                    <Circle color={color}/>
                    <Typography>{text}</Typography>
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        onBtnClick()
                    }} variant={"text"} disabled={isLoading} size={"small"}>Test</Button>
                </Box>
            </Stack>
        </DashboardPaperCard>
    )
}
