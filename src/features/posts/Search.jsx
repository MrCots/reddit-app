import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../posts/postsSlice';

/**
 * A search component that allows users to search for posts in a specific subreddit.
 * It maintains the state of the search term and dispatches an action to fetch posts
 * when the form is submitted.
 */
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchPosts(searchTerm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a subreddit"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search subreddit"
      />
      <button type="submit" aria-label="Search">Search</button>
    </form>
  );
};

export default Search;