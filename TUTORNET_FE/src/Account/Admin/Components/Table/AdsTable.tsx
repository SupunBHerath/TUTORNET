import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, TextField, MenuItem, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, LinearProgress, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdsBtnAdmin from '../AddAds/AdsBtnAdmin';
import axios from 'axios';
// import './AdsTable.css'; // Import custom CSS

interface Ad {
    id: number;
    _id: string;
    location: string;
    uploadedDay: string;
    status: string;
    status2: string;
}

const AdsTable: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [idToDelete, setIdToDelete] = React.useState<string>('');
    const [remainingDays, setRemainingDays] = useState<number[]>([]);
    const [status, setStatus] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [statusToUpdate, setStatusToUpdate] = useState<{ id: string, newStatus: string }>({ id: '', newStatus: '' });
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [editStatusOpen, setEditStatusOpen] = useState(false);

    // Get data
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get('/ads/all');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
              const data = response.data.filter((ad: Ad) => ad.status === 'Done');
                setAds(data);
                setFilteredAds(data);
                console.log(data);

                setTimeout(() => {
                    setLoading(true);
                }, 1000);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAds();
    }, []);

    const confirmDeleteAd = () => {
        setError(false);

        axios.delete(`/ads/delete/${idToDelete}`)
            .then(response => {
                if (response) {
                    setSuccess(true);
                    console.log('Advertisement deleted successfully');
                    setTimeout(() => {
                        setSuccess(false);
                    }, 1000);
                    setAds(prevAds => prevAds.filter(ad => ad._id !== idToDelete));
                    setFilteredAds(prevFilteredAds => prevFilteredAds.filter(ad => ad._id !== idToDelete));
                } else {
                    console.error('Failed to delete advertisement');
                    setError(true);
                }
            })
            .catch(error => {
                console.error('Error deleting advertisement:', error);
                setError(true);
            })
            .finally(() => {
                setConfirmationOpen(false);
            });
    };

    const confirmUpdateStatus = () => {
        setError(false);

        const { id, newStatus } = statusToUpdate;
        console.log(newStatus);

        axios.put(`/ads/status/update/${id}`, { status2: newStatus })
            .then(response => {
                if (response.status === 200) {
                    setTimeout(() => {
                        setSuccess(true);
                    }, 1500);

                    setAds(prevAds => prevAds.map(ad => ad._id === id ? { ...ad, status2: newStatus } : ad));
                    setFilteredAds(prevFilteredAds => prevFilteredAds.map(ad => ad._id === id ? { ...ad, status2: newStatus } : ad));
                } else {
                    setTimeout(() => {
                        setError(true);

                    }, 1500);
                }
            })
            .catch(error => {
                console.error('Error updating status:', error);
                setTimeout(() => {
                    setError(true);
                }, 1500);
            })
            .finally(() => {
                setEditStatusOpen(false);
            });
    };

    useEffect(() => {
        const today = new Date();
        const newRemainingDays = ads.map(ad => {
            const uploadedDate = new Date(ad.uploadedDay);
            const diffInTime = today.getTime() - uploadedDate.getTime();
            let diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

            diffInDays = Math.max(0, Math.min(7, diffInDays));

            return (7 - diffInDays);
        })
        setRemainingDays(newRemainingDays);

        const newStatus = newRemainingDays.map(days => {
            return days > 0 ? "Running" : "Stopped";
        });
        setStatus(newStatus);
    }, [ads]);

    const handleLocationFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationFilter(event.target.value);
        filterAds(event.target.value);
    };

    const filterAds = (location: string) => {
        if (location === '') {
            setFilteredAds(ads);
        } else {
            const filtered = ads.filter(ad => ad.location.toLowerCase().includes(location.toLowerCase()));
            setFilteredAds(filtered);
        }
    };

    const deleteAd = (id: string) => {
        setIdToDelete(id);
        setConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setConfirmationOpen(false);
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        setStatusToUpdate({ id, newStatus });
        setEditStatusOpen(true);
    };

    const handleEditStatusClose = () => {
        setEditStatusOpen(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <AdsBtnAdmin />
            </div>
            <div className="Tablebtn mt-3 justify-content-between" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div>
                    <TextField
                        select
                        label="Filter by Location"
                        value={locationFilter}
                        onChange={handleLocationFilterChange}
                        variant="outlined"
                        sx={{ width: '200px' }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Landing page">Landing page</MenuItem>
                        <MenuItem value="Wall Page">Wall Page</MenuItem>
                        <MenuItem value="Search Page">Search Page</MenuItem>
                    </TextField>
                    <br />
                </div>
            </div>
            <div className="spacesDiv h-25" style={{ minHeight: '70px' }}>
                {success && <Alert severity="success">Operation completed successfully</Alert>}
                {error && <Alert severity="error">Failed to complete operation</Alert>}
            </div>

            {loading ? (
                <TableContainer component={Paper} className="ads-table-container">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Ads Id</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Day</TableCell>
                                <TableCell>Remaining Days</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAds.map((row, index) => (
                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.uploadedDay.split("T")[0]}</TableCell>
                                    <TableCell style={{ color: remainingDays[index] === 0 ? 'red' : 'inherit' }}>{remainingDays[index]}</TableCell>
                                    <TableCell>{row.status2}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleStatusChange(row._id, row.status)} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteAd(row._id)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <LinearProgress />
            )}

            <Dialog
                open={confirmationOpen}
                onClose={handleCloseConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to proceed with this action?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation} color="primary">
                        Cancel
                    </Button>
                    {idToDelete ? (
                        <Button onClick={confirmDeleteAd} color="primary" autoFocus>
                            Yes, Delete
                        </Button>
                    ) : (
                        <Button onClick={confirmUpdateStatus} color="primary" autoFocus>
                            Yes, Update
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            <Dialog
                open={editStatusOpen}
                onClose={handleEditStatusClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Update Status</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={statusToUpdate.newStatus}
                            onChange={(e) => setStatusToUpdate({ ...statusToUpdate, newStatus: e.target.value })}
                        >
                            <FormControlLabel value="Running" control={<Radio />} label="Running" />
                            <FormControlLabel value="Stopped" control={<Radio />} label="Stopped" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditStatusClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmUpdateStatus} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AdsTable;
