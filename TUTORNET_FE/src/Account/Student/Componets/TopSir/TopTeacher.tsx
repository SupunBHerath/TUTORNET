import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './Top.css';
import { Color } from '../../../../Components/CSS/CSS';

interface Teacher {
    name: string;
    subject: string;
    profileLink: string;
    avatar: string;
    classType: string;
}

const SearchBar: React.FC<{ onSearch: (search: { name: string; subject: string; classType: string }) => void }> = ({ onSearch }) => {
    const [nameSearch, setNameSearch] = useState('');
    const [subjectSearch, setSubjectSearch] = useState('');
    const [classTypeSearch, setClassTypeSearch] = useState('');

    useEffect(() => {
        onSearch({ name: nameSearch, subject: subjectSearch, classType: classTypeSearch });
    }, [nameSearch, subjectSearch, classTypeSearch]);

    return (
        <div className="search-bar  d-flex gap-3   " >
            <TextField
                label="Search by name"
                variant="outlined"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="search-input"
                style={{borderColor:Color.PrimaryColor}}
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
            <Avatar alt={teacher.name} src={teacher.avatar} sx={{ width: 150, height: 150 }} />
            <div className="teacher-info">
                <h2>{teacher.name}</h2>
                <p>Subject: {teacher.subject}</p>
                <p>Class Type: {teacher.classType}</p>
            </div>
            <div className="profile-link">
                <a href={teacher.profileLink} target="_blank" rel="noopener noreferrer">View Profile</a>
            </div>
        </div>
    );
};

const TeacherProfilesList: React.FC<{ teachers: Teacher[] }> = ({ teachers }) => {
    return (
        <div className="teacher-profiles">
            {teachers.map((teacher, index) => (
                <TeacherProfile key={index} teacher={teacher} />
            ))}
        </div>
    );
};

// Sample data for teachers
const initialTeachers: Teacher[] = [
    {
        name: "John Doe",
        subject: "Mathematics",
        classType: "Hall",
        profileLink: "https://example.com/profiles/john_doe",
        avatar: "../../../../../public/Teacher/t1.jpeg", // Example avatar image URL
    },
    {
        name: "Jane Smith",
        subject: "Physics",
        classType: "Online",
        profileLink: "https://example.com/profiles/jane_smith",
        avatar: "https://via.placeholder.com/150", // Example avatar image URL
    },
    {
        name: "Jane Smith",
        subject: "Physics",
        classType: "Online",
        profileLink: "https://example.com/profiles/jane_smith",
        avatar: "https://via.placeholder.com/150", // Example avatar image URL
    },
    {
        name: "Jane Smith",
        subject: "Physics",
        classType: "Online",
        profileLink: "https://example.com/profiles/jane_smith",
        avatar: "https://via.placeholder.com/150", // Example avatar image URL
    },
    {
        name: "Jane Smith",
        subject: "Physics",
        classType: "Online",
        profileLink: "https://example.com/profiles/jane_smith",
        avatar: "https://via.placeholder.com/150", // Example avatar image URL
    },
    {
        name: "Jane Smith",
        subject: "Physics",
        classType: "Online",
        profileLink: "https://example.com/profiles/jane_smith",
        avatar: "https://via.placeholder.com/150", // Example avatar image URL
    },
    {
        name: "Jane Smith",
        subject: "Physics",
        classType: "Online",
        profileLink: "https://example.com/profiles/jane_smith",
        avatar: "https://via.placeholder.com/150", // Example avatar image URL
    },
    {
        name: "Jane Smith",
        subject: "Physics",
        classType: "Online",
        profileLink: "https://example.com/profiles/jane_smith",
        avatar: "https://via.placeholder.com/150", // Example avatar image URL
    }
];

const TopTeachers: React.FC = () => {
    const [filteredTeachers, setFilteredTeachers] = useState(initialTeachers);

    const handleSearch = (search: { name: string; subject: string; classType: string }) => {
        const { name, subject, classType } = search;
        const filtered = initialTeachers.filter(teacher =>
            teacher.name.toLowerCase().includes(name.toLowerCase()) &&
            teacher.subject.toLowerCase().includes(subject.toLowerCase()) &&
            (classType === '' || teacher.classType.toLowerCase() === classType.toLowerCase())
        );
        setFilteredTeachers(filtered);
    };

    return (
        <div>
            <br /><br />
            <div className="color   " >
            <SearchBar onSearch={handleSearch} />

            </div>
            <br />
            <TeacherProfilesList teachers={filteredTeachers} />
        </div>
    );
};

export default TopTeachers;
