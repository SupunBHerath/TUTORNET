import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, IconButton } from '@mui/material';
import { Add, FilterList, GetApp, Delete, DeleteOutline } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import useCookie from '../../../../Hook/UserAuth';

interface Result {
    _id: string;
    name: string;
    indexNumber: string;
    result: string;
    year: string;
}

const ResultUploadPage: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [isAddingResult, setIsAddingResult] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const { userData, isValidToken } = useCookie();
    const id = userData.userId;
    const [availableYears, setAvailableYears] = useState<string[]>([]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`/teacher/${id}`);
            setResults(response.data.results);
            const years: string[] = response.data.results.map((result: Result) => result.year);
            const uniqueYears = Array.from(new Set(years)).sort((a, b) => parseInt(b) - parseInt(a));
            setAvailableYears(uniqueYears.slice(0, 3));
            setSelectedYear(uniqueYears[0]); //
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [isValidToken]);

    const handleAddResult = () => {
        setIsAddingResult(true);
    };

    const handleCancelAdd = () => {
        setIsAddingResult(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFile(file || null);
    };

    const handleFileUpload = async () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('teacherId', id);

        try {
            const response = await axios.post('/teacher/result', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            setResults(response.data.uploadedResults);
        } catch (error) {
            console.error('Error uploading file:', error);
        }

        setIsAddingResult(false);
    };

    const handleDeleteResult = async (resultId: string) => {
        try {
            const response = await axios.delete(`/teacher/result/${id}/${resultId}`);
            setResults(response.data.results);
        } catch (error) {
            console.error('Error deleting result:', error);
        }
    };

    const handleDeleteResultAll = async () => {
        try {
            const response = await axios.delete(`/teacher/result/${id}`);
            setResults(response.data.results);
        } catch (error) {
            console.error('Error deleting result:', error);
        }
    };


    const handleFilter = () => {
        if (!selectedYear) {
            return;
        }
        const filteredResults = results.filter(result => result.year === selectedYear);
        setResults(filteredResults);
    };

    const handleDownloadPDF = () => {
        const input: any = document.getElementById('table-container');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
            pdf.save('table.pdf');
        });
    };

    return (
        <Box sx={{ padding: '20px' }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                        <FilterList sx={{ marginRight: '10px' }} />
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            style={{ padding: '3px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            {availableYears.length > 0 ? (
                                availableYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))
                            ) : (
                                <option value="">No available years</option>
                            )}
                        </select>
                    </Box>
                    <Button variant="outlined" startIcon={<GetApp />} onClick={handleDownloadPDF}>Download PDF</Button>
                </Box>
                <div className="b" style={{ display: 'flex' }}>
                    <Button variant="contained" startIcon={<Add />} onClick={handleAddResult} style={{ marginRight: '10px' }}>Add</Button>
                    <Button variant="contained" startIcon={<DeleteOutline />}onClick={handleDeleteResultAll} style={{backgroundColor:'red'}}>Delete</Button>
                </div>
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
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((result, index) => (
                                <TableRow key={result._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{result.year}</TableCell>
                                    <TableCell>{result.name}</TableCell>
                                    <TableCell>{result.indexNumber}</TableCell>
                                    <TableCell>{result.result}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteResult(result._id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
                open={isAddingResult}
                onClose={handleCancelAdd}
                aria-labelledby="add-result-modal-title"
                aria-describedby="add-result-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="add-result-modal-title" variant="h6" component="h2">
                        Upload Result Sheet
                    </Typography>
                    <Typography id="add-result-modal-description" sx={{ marginBottom: '10px' }}>
                        Please ensure your Excel sheet columns are arranged in the following order: "Name", "Year", "Index Number", "Result".
                    </Typography>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <Button variant="outlined" onClick={handleCancelAdd} sx={{ marginRight: '10px' }}>Cancel</Button>
                        <Button variant="contained" onClick={handleFileUpload}>Upload</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default ResultUploadPage;

