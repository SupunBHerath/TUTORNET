import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FilterList, GetApp } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Result {
    _id: string;
    name: string;
    indexNumber: string;
    result: string;
    year: string;
}

const VResult: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [results, setResults] = useState<Result[]>([]);
    const [displayedResults, setDisplayedResults] = useState<Result[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [availableYears, setAvailableYears] = useState<string[]>([]);

    useEffect(() => {
        fetchResults();
    }, [id]);

    useEffect(() => {
        if (selectedYear) {
            handleFilter(selectedYear);
        } else {
            setDisplayedResults(results);
        }
    }, [selectedYear, results]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`/teacher/${id}`);
            setResults(response.data.results);
            const years: string[] = response.data.results.map((result: Result) => result.year);
            const uniqueYears = Array.from(new Set(years)).sort((a, b) => parseInt(b) - parseInt(a));
            setAvailableYears(uniqueYears);
            setSelectedYear(uniqueYears[0] || '');
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const handleFilter = (year: string) => {
        const filteredResults = results.filter(result => result.year === year);
        setDisplayedResults(filteredResults);
    };

    const handleDownloadPDF = () => {
        const input = document.getElementById('table-container');
        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const width = pdf.internal.pageSize.getWidth();
                const height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                pdf.save('table.pdf');
            });
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl variant="outlined" sx={{ minWidth: 120, marginRight: '10px' }}>
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            label="Year"
                        >
                            {availableYears.length > 0 ? (
                                availableYears.map(year => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))
                            ) : (
                                <MenuItem value="">No available years</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Button variant="outlined" startIcon={<GetApp />} onClick={handleDownloadPDF}>Download PDF</Button>
                </Box>
            </Box>

            <div id="table-container">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Index Number</TableCell>
                                <TableCell>Result</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedResults.map((result, index) => (
                                <TableRow key={result._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{result.year}</TableCell>
                                    <TableCell>{result.name}</TableCell>
                                    <TableCell>{result.indexNumber}</TableCell>
                                    <TableCell>{result.result}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>
    );
};

export default VResult;
