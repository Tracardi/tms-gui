import {SelectChangeEvent} from "@mui/material";

export interface IStatsPanel<TData> {
    status: "success" | "pending" | "error",
    fetchStatus: "fetching" | "idle" | "paused"
    data: TData,
}

export interface IRefreshData {
    time: number,
    onChange: (e: SelectChangeEvent<number>) => void
}
