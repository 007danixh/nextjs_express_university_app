import { useState, useEffect } from 'react';
import { debounce } from '../utils/debounce';
import { fuzzySearch } from '../utils/fuzzySearch';
import {
  searchUniversitiesByName,
  searchUniversitiesByCountry,
} from '../utils/api';
import { storeSearchTerm } from '../services/api';

const useSearchBarLogic = () => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // 'name' or 'country'
  const [results, setResults] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');

  const performFuzzySearch = (searchQuery, data) => {
    if (searchQuery !== '') {
      const fuzzyResults = fuzzySearch(searchQuery, data);
      setResults(fuzzyResults);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    setCurrentQuery(query);

    // Check if query is not empty before making the API call
    if (query !== '') {
      // Fetch data based on the search type
      const fetchData = debounce(async () => {
        let data = [];
        if (searchBy === 'name') {
          data = await searchUniversitiesByName(query);
        } else if (searchBy === 'country') {
          data = await searchUniversitiesByCountry(query);
        }
        performFuzzySearch(query, data);

        // Check if data is received and query is not empty before storing
        if (data.length > 0) {
          await storeSearchTerm(query); // Store the search query
        }
      },1000);

      fetchData();
    } else {
      // Clear results if query is empty
      setResults([]);
    }
  }, [query, searchBy]);

 const handleInputChange = (e, newValue) => {
  // Check if newValue is a string (user typed in the text box)
  
  if (typeof newValue === 'string') {
    setQuery(newValue);
  } else if (newValue && newValue.inputValue) {
    // If newValue is an object with inputValue property, it means a suggestion was selected
    setQuery(newValue.inputValue);
    
    // You can also perform any additional actions when a suggestion is selected here
    // For example, trigger a search based on the selected suggestion.
  }
};
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return {
    query,
    searchBy,
    results,
    currentQuery,
    handleInputChange,
    handleSearchByChange,
  };
};

export default useSearchBarLogic;
