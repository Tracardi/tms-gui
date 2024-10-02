export interface HeadCell<TData> {
    disablePadding: boolean;
    id: keyof TData;
    label: string;
    dataFormat: "string" | "numeric" | "date";
}
