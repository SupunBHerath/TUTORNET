import * as React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Grid, TextField, MenuItem, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AdsBtnAdmin from '../AddAds/AdsBtnAdmin';

const style = {
    position: 'absolute' as 'absolute',
    top: '15%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    bgcolor: 'background.paper',
    border: '4px solid #f6921e',
    borderRadius: 3,
    boxShadow: 24,
    height: '100px',
    p: 3,
};

interface Ad {
    id: number;
    _id: string;
    location: string;
    uploadedDay: string; // New property for day
}

const BasicModal: React.FC<{ locationFilter: string, handleLocationFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void }> = ({ locationFilter, handleLocationFilterChange }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} startIcon={<FilterListIcon />}>Filter</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Box>
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
                                    {/* Add more locations if needed */}
                                </TextField>
                                <br />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

const AdsTable: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [change, setChange] = React.useState(false);
    const [idToDelete, setIdToDelete] = React.useState<string>('');

    useEffect(() => {
        fetch('http://localhost:8080/ads/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAds(data);
                setFilteredAds(data); // Initialize filteredAds with all ads
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
        setChange(true);
    };

    const dontSaveChanges = () => {
        setChange(false);
    };

    const saveChanges = () => {
        fetch(`http://localhost:8080/ads/delete/${idToDelete}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setSuccess(true);
                    setChange(false);
                    console.log('Advertisement deleted successfully');
                } else {
                    console.error('Failed to delete advertisement');
                    setError(true);
                }
            })
            .catch(error => {
                console.error('Error deleting advertisement:', error);
                setError(true);
            });
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <AdsBtnAdmin />
            </div>
            <div className="Tablebtn mt-3 justify-content-between   " style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BasicModal locationFilter={locationFilter} handleLocationFilterChange={handleLocationFilterChange} />
                <div className="btn1 gap-4 d-flex ">
                    <Button
                        variant="contained"
                        onClick={saveChanges}
                        disabled={!change}
                        startIcon={<DoneAllIcon />}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        onClick={dontSaveChanges}
                        disabled={!change}
                        startIcon={<HighlightOffIcon />}
                    >
                        Cancel
                    </Button>
                </div>

            </div>
            <div className="spacesDiv h-25" style={{ minHeight: '70px' }}>
                {success && <Alert severity="success">Advertisement deleted successfully</Alert>}
                {error && <Alert severity="error">Failed to delete advertisement</Alert>}
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Ads Id</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Day</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAds.map((row, index) => (
                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.uploadedDay.split("T")[0]}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => deleteAd(row._id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default AdsTable;
