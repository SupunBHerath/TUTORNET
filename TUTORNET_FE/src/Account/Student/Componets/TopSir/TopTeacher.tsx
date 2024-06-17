import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import './Top.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Rating, Chip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete

interface Teacher {
    _id: string;
    name: string;
    subject: string;
    profileLink: string;
    profilePicture: string;
    classType: string;
    rating: number;
    district: string; // Location information
}

const SearchBar: React.FC<{ onSearch: (search: { name: string; subject: string; classType: string; district: string[] }) => void }> = ({ onSearch }) => {
    const [nameSearch, setNameSearch] = useState('');
    const [subjectSearch, setSubjectSearch] = useState('');
    const [classTypeSearch, setClassTypeSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null); // State for single selection
    const [locationSearch, setLocationSearch] = useState(''); // State to manage current input value
    const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);

    useEffect(() => {
        onSearch({ name: nameSearch, subject: subjectSearch, classType: classTypeSearch, district: selectedLocation ? [selectedLocation] : [] });
    }, [nameSearch, subjectSearch, classTypeSearch, selectedLocation, onSearch]);

    // Static list of Sri Lanka districts for autocomplete
    const districts = [
        'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', // Add more districts as needed
    ];

    const handleLocationChange = (value: string) => {
        setLocationSearch(value);
        const filteredSuggestions = districts.filter(district =>
            district.toLowerCase().includes(value.toLowerCase())
        );
        setLocationSuggestions(filteredSuggestions);
    };

    const handleSelectLocation = (value: string) => {
        setSelectedLocation(value);
        setLocationSearch('');
        setLocationSuggestions([]);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && locationSuggestions.length > 0) {
            handleSelectLocation(locationSuggestions[0]);
        }
    };

    const renderSelectedLocation = () => {
        if (!selectedLocation) {
            return null;
        }
        return (
            <Chip
                label={selectedLocation}
                onDelete={() => setSelectedLocation(null)}
                className="search-chip"
            />
        );
    };

    return (
        <div className="search-bar d-flex gap-3">
            <TextField
                label="Search by name"
                variant="outlined"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="search-input"
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

            <div className="location-search" style={{ width: '200px' }}>
                <Autocomplete
                    id="district-autocomplete"
                    options={districts}
                    value={selectedLocation}
                    onChange={(event, newValue) => {
                        setSelectedLocation(newValue);
                    }}
                    inputValue={locationSearch}
                    onInputChange={(event, newInputValue) => {
                        handleLocationChange(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search by location"
                            variant="outlined"
                            className="search-input"
                            onKeyPress={handleKeyPress}
                        />
                    )}
                />
    
               
            </div>
        </div>
    );
};

const TeacherProfile: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
    return (
        <div className="teacher-card">
            <Avatar alt={teacher.name} src={teacher.profilePicture} sx={{ width: 150, height: 150 }} className='border border-dark' />
            <div className="teacher-info">
                <h2>{teacher.name}</h2>
                <p>Subject: {teacher.subject}</p>
                <p>Location: {teacher.district}</p>
                <p>Class Type: {teacher.classType}</p>
                {teacher.rating !== null && (
                    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Rating name="read-only" value={teacher.rating} readOnly />
                    </Box>
                )}
            </div>
            <div className="profile-link text-center">
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
                    const teachersData: Teacher[] = await Promise.all(
                        response.data.map(async (teacher: any) => {
                            const ratingResponse = await axios.get(`feedback/rating/${teacher._id}`);
                            return {
                                _id: teacher._id,
                                name: teacher.name,
                                subject: teacher.subject,
                                profileLink: teacher.profileLink || `/teacher/${teacher._id}`,
                                profilePicture: teacher.profilePicture || "https://via.placeholder.com/150",
                                classType: teacher.classType,
                                rating: ratingResponse.data.userTotalRatings || 0,
                                district: teacher.district, // Assign district from API to Teacher interface
                            };
                        })
                    );
                    // Sort teachers by rating in descending order
                    teachersData.sort((a, b) => b.rating - a.rating);
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

    const handleSearch = (search: { name: string; subject: string; classType: string; district: string[] }) => {
        const { name, subject, classType, district } = search;

        const filtered = allTeachers.filter(teacher =>
            teacher.name.toLowerCase().includes(name.toLowerCase()) &&
            teacher.subject.toLowerCase().includes(subject.toLowerCase()) &&
            (classType === '' || teacher.classType.toLowerCase() === classType.toLowerCase()) &&
            (district.length === 0 || district.some(d => teacher.district.toLowerCase().includes(d.toLowerCase())))
        );

        setFilteredTeachers(filtered);
    };

    const renderContent = () => {
        if (loading) {
            return <CircularProgress />;
        }

        if (error) {
            return <div className="error-message">{error}</div>;
        }

        return (
            <div>
                <SearchBar onSearch={handleSearch} />
                <TeacherProfilesList teachers={filteredTeachers} />
            </div>
        );
    };

    return (
        <div>
            <br /><br /><br />
            {renderContent()}
        </div>
    );
};

export default TopTeachers;
