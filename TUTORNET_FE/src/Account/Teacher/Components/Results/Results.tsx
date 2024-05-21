import React, { useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal } from '@mui/material';
import { Add, FilterList, GetApp } from '@mui/icons-material'; // Import icons for filter and PDF download
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Result {
    name: string;
    indexNumber: string;
    result: string;
}

const ResultUploadPage: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [isAddingResult, setIsAddingResult] = useState(false);

    const handleAddResult = () => {
        setIsAddingResult(true);
    };

    const handleCancelAdd = () => {
        setIsAddingResult(false);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                if (data) {
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json: any[] = XLSX.utils.sheet_to_json(worksheet);
                    const parsedResults = json.map(item => ({
                        name: item['Name'],
                        indexNumber: item['Index Number'],
                        result: item['Result']
                    }));
                    setResults(parsedResults);
                }
            };
            reader.readAsBinaryString(file);
        }
        setIsAddingResult(false);
    };

    const handleFilter = () => {
        // Add filter functionality here
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
            <Typography variant="h4" gutterBottom>Result Upload</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="outlined" startIcon={<FilterList />} onClick={handleFilter} sx={{ marginRight: '10px' }}>Filter</Button>
                    <Button variant="outlined" startIcon={<GetApp />} onClick={handleDownloadPDF}>Download PDF</Button>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={handleAddResult}>Add</Button>
            </Box>
            <div id="table-container">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Index Number</TableCell>
                                <TableCell>Result</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((result, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{result.name}</TableCell>
                                    <TableCell>{result.indexNumber}</TableCell>
                                    <TableCell>{result.result}</TableCell>
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
                        Please ensure your Excel sheet columns are arranged in the following order: "Name", "Index Number", "Result".
                    </Typography>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <Button variant="outlined" onClick={handleCancelAdd} sx={{ marginRight: '10px' }}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default ResultUploadPage;
