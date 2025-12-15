import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../posts/postsSlice';

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