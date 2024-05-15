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
    adsId: string;
    email: string;
    location: string;
    status: string; // New property for status
};

// Sample data for the table
const ads: Ad[] = [
    { id: 1, adsId: "AD001", email: "example1@example.com", location: "New York", status: "Active" },
    { id: 2, adsId: "AD002", email: "example2@example.com", location: "Los Angeles", status: "Inactive" },
    { id: 3, adsId: "AD003", email: "example3@example.com", location: "Chicago", status: "Active" },
    // Add more ads if needed
];
// Fetch data and populate 'rows' array...

export default function AdsTable() {
    const [filteredRows, setFilteredRows] = useState<Ad[]>(ads);

    // Function to handle status change
    const handleStatusChange = (id: number, status: string) => {
        const updatedRows = filteredRows.map(user => {
            if (user.id === id) {
                return { ...user, status: status };
            }
            return user;
        });
        setFilteredRows(updatedRows);
    };

    // Function to save changes
    const saveChanges = () => {
        // Implement logic to save changes to the server or local storage
        console.log('Changes saved:', filteredRows);
    };

    return (
        <>
            <AddAds />
            {/* Filter modal and PDF download button... */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Ads Id</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Status</TableCell> {/* New column for status */}
                            <TableCell>Edit</TableCell> {/* New column for status */}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((row, index) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.adsId}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            {/* Save changes button... */}
        </>
    );
}
