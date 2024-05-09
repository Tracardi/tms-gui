export interface HeadCell<TData> {
    disablePadding: boolean;
    id: keyof TData;
    label: string;
    numeric: boolean;
    dateFormat: boolean;
}
