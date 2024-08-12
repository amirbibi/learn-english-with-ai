# Learn English with AI - Client

This is the frontend application for the "Learn English with AI" project. It's built with React, TypeScript, and Material-UI, providing an interactive interface for users to explore and learn English concepts with AI assistance.

## Features

- Interactive concept explorer
- AI-powered concept evaluations
- User authentication (including Google OAuth)
- Responsive design with dark/light mode support
- Speech-to-text functionality for concept descriptions

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/learn-english-with-ai.git
   ```
2. Navigate to the client directory:
   ```
   cd learn-english-with-ai/client
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the client directory and add necessary environment variables:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth-success
   ```

### Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

- `src/`: Source files
  - `components/`: Reusable React components
  - `contexts/`: React context providers
  - `hooks/`: Custom React hooks
  - `lib/`: Utility functions, constants, and types
  - `pages/`: Main page components
  - `routes/`: Routing configuration
  - `services/`: API service functions

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Create a production build
- `npm run lint`: Run ESLint for code linting
- `npm run preview`: Preview the production build locally

## Learn More

For more information about the technologies used in this project:

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/getting-started/usage/)
- [Vite Documentation](https://vitejs.dev/guide/)
