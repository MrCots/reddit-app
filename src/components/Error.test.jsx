import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Error from './Error';

/**
 * Test suite for the Error component.
 * This test uses Vitest for the test runner and React Testing Library for rendering
 * and interacting with the component, which is the modern standard for Vite apps.
 */
describe('Error component', () => {
  /**
   * Test case to ensure the component renders the correct error message.
   */
  it('renders the error message correctly', () => {
    const errorMessage = 'Failed to fetch data.';
    render(<Error message={errorMessage} onRetry={() => {}} />);

    // Assert that the main heading is visible
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();

    // Assert that the specific error message passed via props is displayed
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  /**
   * Test case to verify that the onRetry callback is called when the button is clicked.
   */
  it('calls the onRetry function when the button is clicked', () => {
    const retryMock = vi.fn(); // Create a mock function from Vitest
    render(<Error message="An error occurred" onRetry={retryMock} />);

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    // Assert that our mock function was called exactly once
    expect(retryMock).toHaveBeenCalledTimes(1);
  });
});