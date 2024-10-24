import {ISubscription} from "../../../types/api/queue";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {abbreviateNumber} from "../../../lib/converters.ts";
import DashboardPaperCard from "../../ui/dashboardPaperCard.tsx";

interface IBacklogCard {
    subscriptions: {
        [key: string]: ISubscription
    }
}

export default function BacklogCard({subscriptions}: IBacklogCard) {

    let msgCount: string | number = 0
    let delayedMsgCount = 0

    for (const key in subscriptions) {
        msgCount += subscriptions[key].msgBacklog
        delayedMsgCount += subscriptions[key].msgDelayed
    }

    msgCount = abbreviateNumber(msgCount)

    return (
        <DashboardPaperCard sx={{height: "100%", padding: "0.6rem 0"}}>
            <Typography variant={"subtitle1"} align={"center"}>Backlog Messages</Typography>
            <Stack alignItems={"center"} justifyContent={"center"} sx={{height: "100%"}}>
                <Typography sx={{paddingBottom: "2.4rem"}} variant={"h3"}>{msgCount}</Typography>
                <Typography variant="subtitle1">with
                    delayed: {delayedMsgCount}</Typography>
            </Stack>
        </DashboardPaperCard>
    )
}
