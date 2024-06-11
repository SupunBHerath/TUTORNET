import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import './Top.css';
import { Color } from '../../../../Components/CSS/CSS';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Teacher {
    _id: string;
    name: string;
    subject: string;
    profileLink: string;
    profilePicture: string;
    classType: string;
}

const SearchBar: React.FC<{ onSearch: (search: { name: string; subject: string; classType: string }) => void }> = ({ onSearch }) => {
    const [nameSearch, setNameSearch] = useState('');
    const [subjectSearch, setSubjectSearch] = useState('');
    const [classTypeSearch, setClassTypeSearch] = useState('');

    useEffect(() => {
        onSearch({ name: nameSearch, subject: subjectSearch, classType: classTypeSearch });
    }, [nameSearch, subjectSearch, classTypeSearch, onSearch]);

    return (
        <div className="search-bar d-flex gap-3">
            <TextField
                label="Search by name"
                variant="outlined"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="search-input"
                style={{ borderColor: Color.PrimaryColor }}
            />

            <TextField
                label="Search by subject"
                variant="outlined"
                value={subjectSearch}
                onChange={(e) => setSubjectSearch(e.target.value)}
                className="search-input"
            />
            <FormControl variant="outlined" className="search-input" style={{ width: '200px' }}>
                <InputLabel>Class Type</InputLabel>
                <Select
                    value={classTypeSearch}
                    onChange={(e) => setClassTypeSearch(e.target.value as string)}
                    label="Class Type"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Hall">Hall</MenuItem>
                    <MenuItem value="Group">Group</MenuItem>
                    <MenuItem value="Individual">Individual</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

const TeacherProfile: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
    return (
        <div className="teacher-card">
        <Avatar alt={teacher.name} src={teacher.profilePicture} sx={{ width: 150, height: 150 }} />
        <div className="teacher-info">
          <h2>{teacher.name}</h2>
          <p>Subject: {teacher.subject}</p>
          <p>Class Type: {teacher.classType}</p>
        </div>
        <div className="profile-link">
          <Link to={`teacher/${teacher._id}/&${encodeURIComponent(teacher.name)}`}>View Profile</Link>
        </div>
      </div>
    );
};

const TeacherProfilesList: React.FC<{ teachers: Teacher[] }> = ({ teachers }) => {
    return (
        <div className="teacher-profiles">
            {teachers.map((teacher) => (
                <TeacherProfile key={teacher._id} teacher={teacher} />
            ))}
        </div>
    );
};

const TopTeachers: React.FC = () => {
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
    const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('/teacher/all');
                if (response.status === 200) {
                    const teachersData: Teacher[] = response.data.map((teacher: any) => ({
                        _id: teacher._id,
                        name: teacher.name,
                        subject: teacher.subject,
                        profileLink: teacher.profileLink || "/teacher" + teacher._id,
                        profilePicture: teacher.profilePicture || "https://via.placeholder.com/150",
                        classType: teacher.classType,
                    }));
                    setAllTeachers(teachersData);
                    setFilteredTeachers(teachersData);
                } else {
                    throw new Error('Failed to fetch teachers');
                }
            } catch (error) {
                setError('Error fetching teachers');
                console.error('Error fetching teachers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    const handleSearch = (search: { name: string; subject: string; classType: string }) => {
        const { name, subject, classType } = search;
        const filtered = allTeachers.filter(teacher =>
            teacher.name?.toLowerCase().includes(name.toLowerCase()) &&
            teacher.subject?.toLowerCase().includes(subject.toLowerCase()) &&
            (classType === '' || teacher.classType?.toLowerCase() === classType.toLowerCase())
        );
        setFilteredTeachers(filtered);
    };

    if (loading) {
        return <div className="loading-spinner"><CircularProgress /></div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <br /><br /><br />
            <SearchBar onSearch={handleSearch} />
            <TeacherProfilesList teachers={filteredTeachers} />
        </div>
    );
};

export default TopTeachers;
