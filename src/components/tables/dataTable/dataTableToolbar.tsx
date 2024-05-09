import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";

interface DataTableToolbarProps {
    title: string;
    numSelected: number;
    deleteHandler: () => void;
    onCreateBtnClick: () => void;
}

export default function DataTableToolbar({title, numSelected, deleteHandler, onCreateBtnClick}: DataTableToolbarProps) {

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            )}
            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton onClick={deleteHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            )}
            <Button onClick={onCreateBtnClick} variant="contained" sx={{mx: 2, py: 0.6}}>Create</Button>
        </Toolbar>
    );
}
