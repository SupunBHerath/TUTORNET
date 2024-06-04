import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Grid, TextField, MenuItem, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdsBtnAdmin from '../AddAds/AdsBtnAdmin';
import axios from 'axios';


interface Ad {
    id: number;
    _id: string;
    location: string;
    uploadedDay: string; // New property for day
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

//get data--------------------
    useEffect(() => {
        axios.get('/ads/all')
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                return response.data;
            })
            .then(data => {
                setAds(data);
                setFilteredAds(data);
                setTimeout(() => {
                  setLoading(true);
                }, 1000)
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const confirmDeleteAd = () => {
        axios.delete(`/ads/delete/${idToDelete}`)
            .then(response => {
                if (response.status === 200) {
                    setSuccess(true);
                    console.log('Advertisement deleted successfully');
                    setTimeout(() => {
                        setSuccess(false);
                    }, 1000)
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





    const [confirmationOpen, setConfirmationOpen] = useState(false);

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
                {success && <Alert severity="success">Advertisement deleted successfully</Alert>}
                {error && <Alert severity="error">Failed to delete advertisement</Alert>}
            </div>

            {loading ? (<TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Ads Id</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Day</TableCell>
                            <TableCell>Remaining Days</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell></TableCell>
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
                                <TableCell>{status[index]}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => deleteAd(row._id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>) : (
                <LinearProgress />
            )}

            <Dialog
                open={confirmationOpen}
                onClose={handleCloseConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert                -dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this advertisement?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteAd} color="primary" autoFocus>
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AdsTable;

