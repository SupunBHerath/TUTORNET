import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Switch } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

interface Subject {
  _id: string;
  title: string;
  status: string;
}

const SubjectTable: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [statusConfirmationOpen, setStatusConfirmationOpen] = useState<boolean>(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedSubjectStatus, setSelectedSubjectStatus] = useState<string>('');
  const [addSubjectOpen, setAddSubjectOpen] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<string>('');
  const [newSubjectVisible, setNewSubjectVisible] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/subject/all')
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the subjects!', error);
      });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleStatus = (id: string, status: string) => {
    setSelectedSubjectId(id);
    setSelectedSubjectStatus(status);
    setStatusConfirmationOpen(true);
  };

  const handleConfirmToggleStatus = () => {
    if (selectedSubjectId !== null) {
      const newStatus = selectedSubjectStatus === 'Visible' ? 'Invisible' : 'Visible';
      axios.put(`/subject/${selectedSubjectId}`, { status: newStatus })
        .then(() => {
          setSubjects(subjects.map(subject =>
            subject._id === selectedSubjectId ? { ...subject, status: newStatus } : subject
          ));
          setStatusConfirmationOpen(false);
        })
        .catch(error => {
          console.error('There was an error updating the subject status!', error);
        });
    }
  };

  const handleDelete = () => {
    if (selectedSubjectId !== null) {
      axios.delete(`/subject/${selectedSubjectId}`)
        .then(() => {
          setSubjects(subjects.filter(subject => subject._id !== selectedSubjectId));
          setConfirmationOpen(false);
        })
        .catch(error => {
          console.error('There was an error deleting the subject!', error);
        });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableRows: string[][] = subjects.map(subject => [
      subject.title,
      subject.status
    ]);

    (doc as any).autoTable({
      head: [['Subject Name', 'Status']],
      body: tableRows,
    });

    doc.save('subject_list.pdf');
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubject = () => {
    if (newSubject.trim() !== '') {
      const newSubjectData = { title: newSubject, status: newSubjectVisible ? 'Visible' : 'Invisible' };
      axios.post('/subject/add', newSubjectData)
        .then(response => {
          setSubjects([...subjects, response.data]);
          setNewSubject('');
          setNewSubjectVisible(true);
          setAddSubjectOpen(false);
        })
        .catch(error => {
          console.error('There was an error adding the subject!', error);
        });
    }
  };

  return (
    <div>
      <div className="row mx-2" style={{ maxWidth: '250px' }}>
        <Button
          className='justify-content-lg-start mb-3'
          onClick={generatePDF}
          startIcon={<DownloadIcon />}
        >
          PDF
        </Button>
        <Button
          className='justify-content-lg-start mb-3'
          onClick={() => setAddSubjectOpen(true)}
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          Add Subject
        </Button>
        <TextField
          label="Search Subject"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubjects.map(subject => (
              <TableRow key={subject._id}>
                <TableCell>{subject.title}</TableCell>
                <TableCell>{subject.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleToggleStatus(subject._id, subject.status)}
                    color={subject.status === 'Visible' ? 'primary' : 'secondary'}
                  >
                    {subject.status === 'Visible' ? 'Make Invisible' : 'Make Visible'}
                  </Button>
                  <Button onClick={() => {
                    setSelectedSubjectId(subject._id);
                    setConfirmationOpen(true);
                  }} color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this subject?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={statusConfirmationOpen} onClose={() => setStatusConfirmationOpen(false)}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          Are you sure you want to change the visibility status of this subject?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmToggleStatus} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addSubjectOpen} onClose={() => setAddSubjectOpen(false)}>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent>
          <TextField
            label="New Subject"
            variant="outlined"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            style={{ marginRight: '10px', marginBottom: '20px', width: '100%' }}
          />
          <span>Visible</span>
          <Switch
            checked={newSubjectVisible}
            onChange={() => setNewSubjectVisible(!newSubjectVisible)}
            color="primary"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddSubjectOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSubject} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubjectTable;
