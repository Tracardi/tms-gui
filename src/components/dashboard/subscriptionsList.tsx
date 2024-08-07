import {Collapse, Divider, ListSubheader} from "@mui/material";
import {ISubscription} from "../../types/api/queue";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import DashboardPaperCard from "../ui/dashboardPaperCard.tsx";

interface ISubscriptionsList {
    subscriptions: {
        [key: string]: ISubscription
    }
}

export default function SubscriptionsList({subscriptions}: ISubscriptionsList) {

    const {palette} = useTheme()

    const [open, setOpen] = useState(false)
    const [subscriptionName, setSubscriptionName] = useState("")

    const listItems = []

    for (const [name, subscription] of Object.entries(subscriptions)) {
        const clickHandler = () => {
            setSubscriptionName(name)
            setOpen(prevState => !prevState)
        }

        const collapseListItemStyles = {pl: 4}

        const item = (<>
            <Divider/>
            <ListItemButton onClick={clickHandler}>
                <ListItemText primary={name}/>
                <ListItemText primary={subscription.msgBacklog} secondary={"Backlog count"}/>
                {(open && subscriptionName === name) ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open && subscriptionName === name} timeout="auto" unmountOnExit>
                <List sx={{bgcolor: palette.background.paper}} component="div" disablePadding>
                    <ListItem sx={collapseListItemStyles}>
                        <ListItemText primary="Backlog size"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.backlogSize}/>
                    </ListItem>
                    <ListItem sx={collapseListItemStyles}>
                        <ListItemText primary="Delayed messages in backlog"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.msgDelayed}/>
                    </ListItem>
                    <ListItem sx={collapseListItemStyles}>
                        <ListItemText primary="Unack messages"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.unackedMessages}/>
                    </ListItem>
                    <ListItem sx={collapseListItemStyles}>
                        <ListItemText primary="Subscribtion type"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.type}/>
                    </ListItem>
                    <ListItem sx={collapseListItemStyles}>
                        <ListItemText primary="Consumers"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.consumers.length}/>
                    </ListItem>
                    <ListItem sx={collapseListItemStyles}>
                        <ListItemText primary="Durable"/>
                        <ListItemText sx={{textAlign: "right"}} primary={`${subscription.isDurable}`}/>
                    </ListItem>
                    <ListItem sx={collapseListItemStyles}>
                        <ListItemText primary="Replicated"/>
                        <ListItemText sx={{textAlign: "right"}} primary={`${subscription.isReplicated}`}/>
                    </ListItem>
                </List>
            </Collapse>
        </>)
        listItems.push(item)
    }

    return (
        <DashboardPaperCard sx={{
            width: "100%",
            height: "100%",
            maxHeight: "355px",
            padding: "1rem 2rem",
            overflow: "scroll"
        }}>
            <List subheader={
                <ListSubheader disableSticky={true}>Backlog Subscriptions List</ListSubheader>
            }>
                {listItems.map(item => item)}
            </List>
        </DashboardPaperCard>
    )
}
