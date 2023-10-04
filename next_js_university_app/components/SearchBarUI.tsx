import React, { useState, useEffect } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete, // Import the Autocomplete component
  TextField,
} from '@mui/material';
import { fetchSearchSuggestions } from '../services/api'; // Import your API function for fetching suggestions

const SearchBarUI = ({
  query,
  searchBy,
  results,
  handleInputChange,
  handleSearchByChange,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Function to fetch search suggestions when the input is clicked
  const fetchSuggestionsOnClick = async () => {
    try {
      const response = await fetchSearchSuggestions(); // Use your API function to fetch suggestions
      setSuggestions(response); // Update the state with the fetched suggestions
      setShowSuggestions(true); // Show the suggestions dropdown
    } catch (error) {
      console.error(error);
    }
  };

  // Hide suggestions when the input loses focus
  const handleInputBlur = () => {
    setShowSuggestions(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          fullWidth
          id="search"
          options={suggestions}
          freeSolo
          value={query}
          onInputChange={handleInputChange}
          onFocus={fetchSuggestionsOnClick} // Fetch suggestions when input is clicked
          onBlur={handleInputBlur} // Hide suggestions when input loses focus
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
            />
          )}
        />
       
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="search-type">Search By</InputLabel>
          <Select
            value={searchBy}
            onChange={handleSearchByChange}
            label="Search By"
            inputProps={{
              name: 'search-type',
              id: 'search-type',
            }}
          >
            <MenuItem value="name">Search by Name</MenuItem>
            <MenuItem value="country">Search by Country</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default SearchBarUI;
