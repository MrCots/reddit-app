import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as Redux from 'react-redux';
import Search from './Search.jsx';
import { fetchPosts } from '../../features/posts/postsSlice';

/**
 * Mock the 'react-redux' library.
 * This allows us to provide a mock `useDispatch` hook for our tests,
 * isolating the component from the actual Redux store.
 */
vi.mock('react-redux');

/**
 * Test suite for the Search component.
 */
describe('Search component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    // Before each test, spy on useDispatch and make it return our mock function
    vi.spyOn(Redux, 'useDispatch').mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    // After each test, clear all mocks to ensure a clean state for the next test
    vi.clearAllMocks();
  });

  /**
   * Test case to verify that submitting the form dispatches the fetchPosts action.
   */
  it('dispatches fetchPosts with the search term on submit', () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText(/search for a subreddit/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    const searchTerm = 'reactjs';

    // Simulate user typing into the input
    fireEvent.change(searchInput, { target: { value: searchTerm } });

    // Simulate user clicking the search button
    fireEvent.click(searchButton);

    // Assert that dispatch was called with the result of the fetchPosts action creator
    // We check that dispatch was called once.
    expect(mockDispatch).toHaveBeenCalledTimes(1);

    // We then check that the action dispatched has the correct type prefix and argument.
    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction.type).toBe(`${fetchPosts.typePrefix}/pending`);
    expect(dispatchedAction.meta.arg).toBe(searchTerm);
  });
});
