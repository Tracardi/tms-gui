import Box from "@mui/material/Box";
import PaperBox from "../components/ui/paperBox.tsx";
import Typography from "@mui/material/Typography";
import ApiSelectorForm from "../components/forms/apiSelectorForm.tsx";

export default function ApiSelectorPage() {
    return (
        <Box>
            <PaperBox>
                <Typography component="h1" variant="h5">Sign-In to TMS</Typography>
                <ApiSelectorForm/>
            </PaperBox>
        </Box>
    )
}
