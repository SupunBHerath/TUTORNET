import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AcUnitIcon from "@mui/icons-material/AcUnit"; // Snow icon
import MuiAlert from "@mui/material/Alert";

interface User {
    id: number;
    userId: string;
    email: string;
    payDay: string;
    uploadedDay: string;
    location: string;
    payment: number;
    rec: string;
    ads: string;
    status: string;
}

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    message,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="warning" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

interface SnackbarAlertProps {
    open: boolean;
    onClose: () => void;
    severity: "success" | "error" | "warning" | "info";
    message: string;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
    open,
    onClose,
    severity,
    message,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <MuiAlert onClose={onClose} severity={severity} elevation={6} variant="filled">
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

interface UserDataTableProps {
    searchTerm: string;
}

const UserDataTable: React.FC<UserDataTableProps> = (props: any) => {
    const [dataSet, setDataSet] = useState<User[]>([
 
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/reqads/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: User[] = await response.json();
                setDataSet(data);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    const [openFreezeDialog, setOpenFreezeDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("success");
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [editingRow, setEditingRow] = useState<User | null>(null);

    const handleClickOpen = (userId: string) => {
        setSelectedUserId(userId);
        setOpenFreezeDialog(true);
    };

    const handleCloseFreezeDialog = () => {
        setOpenFreezeDialog(false);
        setEditingRow(null);
    };

    const handleFreeze = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(`Freezing user with ID: ${selectedUserId}`);
            const updatedDataSet = dataSet.map((row) => {
                if (row.userId === selectedUserId) {
                    return { ...row, status: "freeze" };
                }
                return row;
            });
            setDataSet(updatedDataSet);
            setOpenFreezeDialog(false);
            showSnackbar("User frozen successfully!", "success");
        } catch (error) {
            console.error("Error freezing user:", error);
        }
    };

    const handleUnfreeze = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(`Unfreezing user with ID: ${selectedUserId}`);
            const updatedDataSet = dataSet.map((row) => {
                if (row.userId === selectedUserId) {
                    return { ...row, status: "active" };
                }
                return row;
            });
            setDataSet(updatedDataSet);
            setOpenFreezeDialog(false);
            showSnackbar("User unfrozen successfully!", "success");
        } catch (error) {
            console.error("Error unfreezing user:", error);
        }
    };

    const handleEdit = (row: User) => {
        setEditingRow(row);
    };

    const handleSave = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Saving changes:", editingRow);
            const updatedDataSet = dataSet.map((row) => {
                if (row.userId === editingRow?.userId) {
                    return editingRow;
                }
                return row;
            });
            setDataSet(updatedDataSet);
            setEditingRow(null);
            showSnackbar("Changes saved successfully!", "success");
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    const filteredDataSet = dataSet.filter((row) => {
        if (props.searchTerm === "") {
            return true;
        } else {
            return (
                row.userId.includes(props.searchTerm) ||
                row.email.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
                row.email.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
                row.email.includes(props.searchTerm) ||
                row.location.toLowerCase().includes(props.searchTerm.toLowerCase())
            );
        }
    });

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    const showSnackbar = (message: string, severity: "success" | "error" | "warning" | "info") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    return (
        <div className="table-container">
            <style>
                {`
          /* Styles for responsive table */
          .table-container {
            overflow-x: auto;
            width: 100%;
          }

          .table {
            width: 100%;
            table-layout: auto; /* Let columns adjust to content width */
          }

          /* Optional: Prevent text wrapping for smaller screens */
          @media (max-width: 768px) {
            .table th, 
            .table td {
              white-space: nowrap;
              font-size: 14px; /* Reduce font size for smaller screens */
            }
          }
        `}
            </style>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center", width: "90px" }}>User ID</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Full Name</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Email</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Phone Number</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Address</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDataSet.map((row) => (
                            <TableRow key={row.userId} sx={{ "&:last-child td, &:last-child th": { borderTop: 1 } }}>
                                {editingRow?.userId !== row.userId ? (
                                    <>
                                        <TableCell component="th" scope="row" style={{ textAlign: "center" }}>
                                            {row.userId}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{row.email}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{row.email}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{row.location}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{row.email}</TableCell>
                                        <TableCell style={{ textAlign: "center", color: row.status === "active" ? "green" : "red" }}>
                                            {row.status}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <div className="d-flex">
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    sx={{ marginRight: "10px" }}
                                                    startIcon={<EditIcon />}
                                                    onClick={() => handleEdit(row)}
                                                >
                                                    Edit
                                                </Button>
                                                {row.status === "active" ? (
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        sx={{ width: "130px" }}
                                                        startIcon={<AcUnitIcon />}
                                                        onClick={() => handleClickOpen(row.userId)}
                                                    >
                                                        Freeze
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="contained"
                                                        sx={{ width: "130px" }}
                                                        startIcon={<AcUnitIcon />}
                                                        onClick={() => handleClickOpen(row.userId)}
                                                    >
                                                        Unfreeze
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell component="th" scope="row" style={{ textAlign: "center" }}>
                                            {row.userId}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <TextField
                                                fullWidth
                                                defaultValue={row.email}
                                                onChange={(e) =>
                                                    setEditingRow({
                                                        ...editingRow,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <TextField
                                                fullWidth
                                                defaultValue={row.email}
                                                onChange={(e) =>
                                                    setEditingRow({
                                                        ...editingRow,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <TextField
                                                fullWidth
                                                defaultValue={row.email}
                                                onChange={(e) =>
                                                    setEditingRow({
                                                        ...editingRow,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <TextField
                                                fullWidth
                                                defaultValue={row.location}
                                                onChange={(e) =>
                                                    setEditingRow({
                                                        ...editingRow,
                                                        location: e.target.value,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            {editingRow.status}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ marginRight: "10px", width: "90px" }}
                                                onClick={handleSave}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => setEditingRow(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Freeze/Unfreeze Confirmation Dialog  */}
            <ConfirmDialog
                open={openFreezeDialog}
                onClose={handleCloseFreezeDialog}
                onConfirm={
                    selectedUserId &&
                        dataSet.find((row) => row.userId === selectedUserId)?.status ===
                        "active"
                        ? handleFreeze
                        : handleUnfreeze
                }
                title="Confirm Action"
                message={
                    selectedUserId &&
                        dataSet.find((row) => row.userId === selectedUserId)?.status ===
                        "active"
                        ? "Are you sure you want to freeze this user?"
                        : "Are you sure you want to unfreeze this user?"
                }
            />

            {/* Snackbar Alert */}
            <SnackbarAlert
                open={openSnackbar}
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
                message={snackbarMessage}
            />
        </div>
    );
};

export default UserDataTable;

