type Severity = "success" | "info" | "warning" | "error"

export interface SnackbarData {
    content: string,
    severity: Severity
}
