import {CircularProgress} from "@mui/material";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import {useQuery} from "react-query";
import {getTenants} from "../lib/api/getTenants.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useState} from "react";
import {DeleteFnParams, Tenant, ValidationError} from "../types/api";
import {AxiosResponse} from "axios";
import TenantsTable from "../components/tables/tenantsTable.tsx";
import TenantDetailsDialog from "../components/dialogs/tenantDetailsDialog.tsx";

export default function TenantsPage() {

    const {apiPrefix, accessToken} = useApiAuthContext()

    const [tenants, setTenants] = useState<Tenant[]>([])
    const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)
    const [openDetails, setOpenDetails] = useState(false)

    const handleTenantDeletion = (_res: AxiosResponse<string, ValidationError>, variables: DeleteFnParams) => {
        const {id} = variables

        setTenants(prevState => {
            return prevState.filter(tenant => tenant.id !== id)
        })
    }

    const handleOpenTenantDetails = () => {
        setCurrentTenant(null)
        setOpenDetails(true)
    }

    const handleTenantsUpdate = (res: AxiosResponse<Tenant, ValidationError>) => {
        setTenants(prevState => {

            const filteredTenants = prevState.filter(tenant => tenant.id !== res.data.id)

            return [...filteredTenants, res.data]
        })

        setOpenDetails(false)
    }

    const handleRowClick = (tenant: Tenant) => {
        setCurrentTenant(tenant)
        setOpenDetails(true)
    }

    const {status} = useQuery({
        queryKey: ["tenants"], queryFn: () => {
            return getTenants({prefixUrl: apiPrefix, accessToken: accessToken})
        }, onSuccess: res => {
            setTenants(res.data)
        }
    })

    if (status === "loading") {
        return (<Box sx={{m: 0, p: 2, width: "100%", display: "flex", justifyContent: "center"}}>
            <CircularProgress/>
        </Box>)
    }

    if (status === "error") {
        return (<Box sx={{m: 0, p: 2, width: "100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Typography component="h3" variant="h5">Something Went Wrong</Typography>
            <Typography component="p">Try again</Typography>
        </Box>)
    }

    return (
        <Box sx={{m: 0, p: 2, width: "100%"}}>
            <TenantsTable data={tenants} onRowClick={handleRowClick} onCreateBtnClick={handleOpenTenantDetails}
                          onDeleteSuccess={handleTenantDeletion}/>
            <TenantDetailsDialog open={openDetails} onClose={() => setOpenDetails(false)} value={currentTenant}
                                 onSuccess={handleTenantsUpdate}/>
        </Box>
    )
}
