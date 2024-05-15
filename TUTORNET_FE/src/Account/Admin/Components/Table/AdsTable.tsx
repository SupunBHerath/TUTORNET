import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Grid, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Logo from '../../../../../public/logo/Tutor logo _ t.png';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddAds from '../AddAds/AddAds';

// Define the user type
type Ad = {
    id: number;
    _id: string;
    location: string;
    uploadedDay: string; // New property for day
};

// Sample data for the table
const rows: Ad[] = [];

fetch('http://localhost:8080/ads/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Assuming the API response is an array of user objects
        rows.push(...data);
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
export default function AdsTable() {
    const [ads, setAds] = useState<Ad[]>(rows);
    const [filteredAds, setFilteredAds] = useState<Ad[]>(ads);
    const [locationFilter, setLocationFilter] = useState<string>('');

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
        const updatedAds = ads.filter(ad => ad._id !== id);
        setAds(updatedAds);
        filterAds(locationFilter); // Reapply filters after deletion
    };



    const saveChanges = () => {
        // Implement logic to save changes to the server or local storage
        console.log('Changes saved:', ads);
    };

    return (
        <>  <div className="d-flex  justify-content-between  ">
            <AddAds />
            {/* Filter modal and PDF download button... */}
            <Box >
                <TextField
                    select
                    label="Filter by Location"
                    value={locationFilter}
                    onChange={handleLocationFilterChange}
                    variant="outlined"
                    sx={{ width: '200px', height: '10px' }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Landing page">Landing page</MenuItem>
                    <MenuItem value="Wall Page">Wall Page</MenuItem>
                    <MenuItem value="Search Page">Search Page</MenuItem>
                    {/* Add more locations if needed */}
                </TextField>
            </Box>
            <Button variant="contained" onClick={saveChanges}>Save Changes</Button>

        </div>
            <br />


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Ads Id</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Day</TableCell>
                            <TableCell>Delete</TableCell> {/* New column for delete button */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAds.map((row, index) => (
                       
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
            {/* Pagination */}
        </>
    );
}
