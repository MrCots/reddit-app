# Reddit-App: A Modern Reddit Client

This project is a web application that uses the Reddit JSON API to allow users to view and search for posts and comments. It is built with a modern frontend stack, including React and Redux, and features a clean, responsive design.

## Features

- **View Popular Posts**: See a list of the current popular posts on Reddit upon visiting the app.
- **Search Subreddits**: Use the search bar to find and display posts from any subreddit.
- **Filter by Subreddit**: A dedicated panel shows a list of popular subreddits for quick filtering.
- **Active Subreddit Indicator**: The currently selected subreddit is highlighted in the sidebar.
- **Detailed Post View**: Click on any post to open a modal displaying the full post content (including images and videos) and its comments.
- **Skeleton Loading States**: Smooth skeleton loading screens provide a better user experience while data is being fetched.
- **Error Handling**: If an API request fails, users are presented with an error message and a "Try Again" button.
- **Responsive Design**: The application is usable on a range of devices, from mobile phones to desktops.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: The recommended approach for writing Redux logic, used for efficient state management.
- **Vite**: A next-generation frontend tooling that provides a faster and leaner development experience.
- **Playwright**: For reliable end-to-end (E2E) testing across modern browsers.
- **Vitest**: A Vite-native unit testing framework. 
- **React Testing Library**: For unit testing React components in a user-centric way.

---

## Testing Strategy

This project follows a comprehensive testing strategy to ensure code quality and application stability, including both unit and end-to-end tests.

### Unit Testing

Unit tests are written to verify that individual components work correctly in isolation.

**Tech Stack**:
- **Vitest**: Chosen over Jest because it is a Vite-native testing framework, offering a Jest-compatible API with significant performance improvements and out-of-the-box integration with the existing Vite configuration. Remember to install & download via run npm install --save-dev vitest @testing-library/react @testing-library/jest-dom for both Vitest and React Testing Library.
- **React Testing Library**: Used for rendering components and simulating user interactions. It encourages writing tests that reflect how users interact with the application, leading to more robust and maintainable tests.

**How to Run Unit Tests:**

```bash
npm test
```

### End-to-End (E2E) Testing

E2E tests are implemented to validate complete application flows from a user's perspective. These tests run in a real browser to ensure all parts of the application work together as expected.

**Tech Stack**:
- **Playwright**: A modern E2E testing framework from Microsoft. It is used to automate browser actions like navigating pages, filling out forms, and clicking buttons to test user journeys.

**How to Run E2E Tests:**

```bash
npx playwright test
```

---

## Future Work

- Implement further animations and transitions to enhance user delight.
- Add accessibility (a11y) improvements.
- Write a more comprehensive suite of unit and E2E tests.
- Deploy the application to a public URL.