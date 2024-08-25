import {CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

interface IStatusWrapper {
    status: "error" | "success" | "pending",
}

export default function StatusWrapper({status}: IStatusWrapper) {

    if (status === "pending") {
        return (
            <Stack justifyContent="center" alignItems="center" sx={{width: "100%", height: "100%",}}>
                <CircularProgress/>
            </Stack>
        )
    }

    return <Stack justifyContent="center" alignItems="center" sx={{width: "100%", height: "100%"}}>
        <Typography variant={"h2"}>Could not get data.</Typography>
    </Stack>

}
