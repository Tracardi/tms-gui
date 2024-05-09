import Grid from "@mui/material/Grid";
import AutoCompleteInput from "../inputs/autoComplete.tsx";
import {Button, CircularProgress, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {useMutation} from "react-query";
import {getToken} from "../../lib/api/getToken.ts";
import Typography from "@mui/material/Typography";
import {MdError} from "react-icons/md";
import useApiAuthContext from "../../hooks/useApiAuthContext.ts";

export default function ApiSelectorForm() {

    const ctx = useApiAuthContext()

    const mutation = useMutation({
        mutationFn: getToken, onSuccess: (res, variables) => {
            const data = res.data
            ctx.setApiPrefix(variables.prefixUrl)
            ctx.setAccessToken(data.access_token)
        }
    })

    const [url, setUrl] = useState("")
    const [apiKey, setApiKey] = useState("")

    const disabled = mutation.isLoading

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        mutation.reset()

        const prefixUrl = url.trim().endsWith("/") ? url.trim().slice(0, -1) : url.trim()

        mutation.mutate({prefixUrl: prefixUrl, apiKey: apiKey})
    }

    return (
        <form onSubmit={submitHandler} style={{width: "100%"}}>
            <Grid container sx={{display: "flex", justifyContent: "center"}}>
                <Grid item xs={8}
                      sx={{display: "flex", justifyContent: "flex-end", flexDirection: "column", gap: "1.4rem"}}>
                    <AutoCompleteInput label="API ENDPOINT URL" value={url} onChange={(e) => {
                        setUrl(e.target.value)
                    }}/>
                    <TextField type="password" value={apiKey} onChange={(e) => {
                        setApiKey(e.target.value)
                    }} label="API KEY"/>
                    <Button type="submit" variant="contained" disabled={disabled}>
                        {mutation.isLoading ? <CircularProgress size={24}/> :
                            <Typography component="p" sx={{fontSize: 16}}>Sign in</Typography>}
                    </Button>
                    {mutation.isError && <Typography color="error" component="p" sx={{display: "flex", alignItems: "center", gap: "0.4rem"}}>
                        <MdError/> Could not get token from api.
                    </Typography>}
                </Grid>
            </Grid>
        </form>
    )
}
