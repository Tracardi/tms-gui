import {Breakpoints, Direction, Theme as MuiTheme} from "@mui/material/styles";
import {Spacing} from "@mui/system";

export interface Theme extends MuiTheme {
    spacing: Spacing,
    breakpoints: Breakpoints,
    direction: Direction
}
