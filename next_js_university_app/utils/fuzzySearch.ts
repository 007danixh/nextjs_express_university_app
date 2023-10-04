import Fuse from "fuse.js";

const fuseOptions = {
  includeScore: true, // Include a score for each result
  keys: ["name"], // Define the keys you want to search in (e.g., name)
  threshold: 1.0, // Adjust this value to include more results
};

export const fuzzySearch = (query, items) => {
  const fuse = new Fuse(items, fuseOptions);

  const searchResults = fuse.search(query);

  if (!searchResults || searchResults.length === 0) {
    return []; // Return an empty array if there are no search results
  }

  return searchResults.map((result) => result.item);
};
