import List from "@mui/material/List";
import DashboardPaperCard from "../ui/dashboardPaperCard.tsx";
import {SxProps, Theme} from "@mui/system";
import {Collapse, ListSubheader} from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Fragment, useState} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";

type Data = {
    [key: string]: string | number | boolean | object
}

type Description = {
    [key: string]: string
}

interface IDashboardList {
    data: Data,
    propertiesDescription?: Description,
    sx?: SxProps<Theme>,
    title: string,
}

export default function DashboardList({data, title, sx, propertiesDescription}: IDashboardList) {

    const [open, setOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState("")
    const {palette} = useTheme()

    const createList = (listData: Data) => {

        const listItems = []

        for (const key in listData) {
            let keyData = listData[key]
            let description = ""
            if (propertiesDescription && Object.prototype.hasOwnProperty.call(propertiesDescription, key)) {
                description = propertiesDescription[key]
            }

            if(typeof(keyData) === "object") {
                const sublist = createList(keyData as Data)

                const clickHandler = () => {
                    setSelectedRow(key)
                    setOpen(prevState => !prevState)
                }

                const item = <Fragment key={key}>
                    <Divider/>
                    <ListItemButton onClick={clickHandler}>
                        <ListItemText primary={key} secondary={description}/>
                        {(open && selectedRow === key) ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={open && selectedRow === key} timeout="auto">
                        <List sx={{bgcolor: palette.background.paper, ml: 4}} component="div" disablePadding>
                            {sublist.map(subItem => subItem)}
                        </List>
                    </Collapse>
                </Fragment>

                listItems.push(item)
                continue
            }

            keyData = keyData.toString()

            const item = <Fragment key={key}>
                <Divider/>
                <ListItem>
                    <ListItemText primary={key.replace(/_/gi, " ")} secondary={description}/>
                    <ListItemText sx={{textAlign: "right"}} primary={keyData}/>
                </ListItem>
            </Fragment>

            listItems.push(item)
        }

        return listItems
    }

    const listItems = createList(data)

    return (
        <DashboardPaperCard sx={sx}>
            <List subheader={
                <ListSubheader disableSticky={true}>{title}</ListSubheader>}>
                {listItems.map(item => item)}
            </List>
        </DashboardPaperCard>
    )
}
