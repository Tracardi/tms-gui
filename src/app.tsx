import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MainLayout from "./layout/mainLayout.tsx";
import ApiSelectorPage from "./pages/apiSelectorPage.tsx";
import {darkTheme, lightTheme} from "./lib/theme.ts";
import useApiAuthContext from "./hooks/useApiAuthContext.ts";
import useThemeModeContext from "./hooks/useThemeModeContext.ts";
import TenantsPage from "./pages/tenantsPage.tsx";
import DashboardPage from "./pages/dashboardPage.tsx";

export default function App() {

    const queryClient = new QueryClient()
    const ctx = useApiAuthContext()
    const {themeMode} = useThemeModeContext()

    const router = createBrowserRouter([
        {
            path: "/",
            element: ctx.accessToken ? <MainLayout/> : <ApiSelectorPage/>,
            children: [
                {
                    path: "/",
                    element: <DashboardPage/>
                },
                {
                    path: "/tenants",
                    element: <TenantsPage/>
                },
                {
                    path: "/licenses",
                    element: <div>TO DO licenses</div>
                }
            ]
        }
    ])

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
                <CssBaseline/>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </QueryClientProvider>

    )
}
