import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";

export default function PaperBox({children}: { children?: React.ReactNode }) {
    return <Grid bgcolor="background.default" container display="flex" justifyContent="center" alignItems="center"
                 style={{
                     height: "100%",
                     position: "absolute",
                     top: "50%",
                     left: "50%",
                     translate: "-50% -50%",
                     gap: "1rem"
                 }}>
        <Grid item xs={10} sm={8} md={7} lg={6} xl={5}>
            <Paper style={{
                gap: "1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 50,
                borderRadius: 10
            }}>
                {children}
            </Paper>
        </Grid>
    </Grid>
}
