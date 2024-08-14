import List from "@mui/material/List";
import {ListSubheader} from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DashboardPaperCard from "../ui/dashboardPaperCard.tsx";

export default function ElasticsearchClusterList() {

    const MOCK_DATA: {
        [key: string]: string | number | boolean
    } = {
        "cluster_name": "cluster",
        "status": "green",
        "timed_out": false,
        "number_of_nodes": 4,
        "number_of_data_nodes": 3,
        "active_primary_shards": 346,
        "active_shards": 693,
        "relocating_shards": 0,
        "initializing_shards": 0,
        "unassigned_shards": 0,
        "delayed_unassigned_shards": 0,
        "number_of_pending_tasks": 0,
        "number_of_in_flight_fetch": 0,
        "task_max_waiting_in_queue_millis": 0,
        "active_shards_percent_as_number": 100
    }

    const listItems = []

    for (const key in MOCK_DATA) {
        const keyData = MOCK_DATA[key].toString()

        const item = <>
            <Divider/>
            <ListItem>
                <ListItemText primary={key.replace(/_/gi, " ")}/>
                <ListItemText sx={{textAlign: "right"}} primary={keyData}/>
            </ListItem>
        </>

        listItems.push(item)
    }

    return (
        <DashboardPaperCard sx={{
            width: "100%",
            height: "100%",
            maxHeight: "600px",
            padding: "1rem 2rem",
            overflow: "scroll"
        }}>
            <List subheader={
                <ListSubheader disableSticky={true}>Elasticsearch Info</ListSubheader>}>
                {listItems.map(item => item)}
            </List>
        </DashboardPaperCard>
    )
}
