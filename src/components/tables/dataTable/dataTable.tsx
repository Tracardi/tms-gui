import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import React, {ChangeEvent, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import useApiAuthContext from "../../../hooks/useApiAuthContext.ts";
import DataTableHead from "./dataTableHead.tsx";
import DataTableToolbar from "./dataTableToolbar.tsx";
import {HeadCell} from "../../../types/table";
import {DeleteFnParams, ValidationError} from "../../../types/api";
import {AxiosResponse} from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {FaEdit} from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import DetailsDialog from "../../dialogs/detailsDialog.tsx";
import {DialogContentText} from "@mui/material";

export type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


interface DataTableProps<TData> {
    onRowClick: (data: TData) => void,
    data: TData[],
    title: string,
    editTooltipTitle: string,
    deleteTooltipTitle: string,
    warningDialogTitle: string,
    warningDialogText: string,
    deleteFn: ({id, accessToken, prefixUrl}: DeleteFnParams) => Promise<AxiosResponse<string, ValidationError>>,
    onDeleteSuccess: (res: AxiosResponse<string, ValidationError>, variables: DeleteFnParams) => void,
    onDeleteError: () => void
    onCreateBtnClick: () => void,
    headCells: HeadCell<TData>[]
}

export default function DataTable<TData extends { id: string }>({
                                                                    onRowClick,
                                                                    data,
                                                                    deleteFn,
                                                                    onDeleteSuccess,
                                                                    headCells,
                                                                    title,
                                                                    onCreateBtnClick,
                                                                    deleteTooltipTitle,
                                                                    editTooltipTitle,
                                                                    warningDialogTitle,
                                                                    warningDialogText,
                                                                    onDeleteError
                                                                }: DataTableProps<TData>) {

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof TData>("id");
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [openDialog, setOpenDialog] = useState(false)

    function renderCellContent(content: TData[keyof TData]): React.ReactNode {
        if (typeof content === 'string') {
            return content;
        } else if (typeof content === 'object') {
            // Convert object to string or handle it differently depending on your needs
            return JSON.stringify(content);
        } else {
            // Handle other types if needed
            return null;
        }
    }

    function getComparator<Key extends keyof TData>(order: Order, orderBy: Key,): (
        a: TData,
        b: TData,
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const {accessToken, apiPrefix} = useApiAuthContext()

    const mutation = useMutation( {
        mutationFn: deleteFn,
        onSuccess: (data: AxiosResponse<string, ValidationError>, variables: DeleteFnParams) => {
            setSelected([])
            setOpenDialog(false)
            onDeleteSuccess(data, variables)
        },
        onError: (error) => {
            console.error(error)
            setSelected([])
            setOpenDialog(false)
            onDeleteError()
        }
    })

    const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof TData,) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleSelectClick = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (data: TData) => {
        onRowClick(data)
    }

    const handleRowDeleteIconClick = (data: TData) => {
        setSelected([data.id])
        setOpenDialog(true)
    }

    const handleDeleteIconClick = () => {
        setOpenDialog(true)
    }

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const deleteHandler = () => {
        selected.forEach(id => {
            mutation.reset()
            mutation.mutate({id, accessToken, prefixUrl: apiPrefix})
        })
    }
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const visibleData = React.useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, data],
    );

    return (
        <>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2, p: 4}}>
                    <DataTableToolbar title={title} numSelected={selected.length} deleteHandler={handleDeleteIconClick}
                                      onCreateBtnClick={onCreateBtnClick}/>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <DataTableHead
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                                order={order}
                                orderBy={orderBy}
                                rowCount={data.length}
                                headCells={headCells}/>
                            <TableBody>
                                {visibleData.map((dataItem, index) => {
                                    const isItemSelected = isSelected(dataItem.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={dataItem.id}
                                            selected={isItemSelected}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    onClick={(event) => handleSelectClick(event, dataItem.id)}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                align="left"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {dataItem.id}
                                            </TableCell>
                                            {headCells.map(cell => {
                                                if (cell.id !== "id") {

                                                    if (cell.dateFormat) {
                                                        const formattedDate = new Date(String(dataItem[cell.id])).toLocaleString()

                                                        return (
                                                            <TableCell align="left">
                                                                {formattedDate}
                                                            </TableCell>
                                                        )
                                                    }

                                                    return (
                                                        <TableCell align="left">
                                                            {renderCellContent(dataItem[cell.id])}
                                                        </TableCell>
                                                    )
                                                }
                                            })}
                                            <Tooltip title={editTooltipTitle}>
                                                <IconButton size="small" onClick={() => handleRowClick(dataItem)}>
                                                    <FaEdit/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={deleteTooltipTitle}
                                                     onClick={() => handleRowDeleteIconClick(dataItem)}>
                                                <IconButton size="small">
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <DetailsDialog isForm={false} isPending={mutation.isPending} open={openDialog} onClose={() => {
                setSelected([])
                setOpenDialog(false)
            }} onSubmit={deleteHandler} title={warningDialogTitle}>
                <DialogContentText>
                    {warningDialogText}
                </DialogContentText>
            </DetailsDialog>
        </>
    );
}
