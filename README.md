# YourAI: Retrieval-Augmented Generation Frontend

## Deployment Links

- Production: [https://your-ai-prod.netlify.app](https://your-ai-prod.netlify.app)
- Development: [https://your-ai-dev.netlify.app](https://your-ai-dev.netlify.app)

## Overview

YourAI is a React-based frontend application for a Retrieval-Augmented Generation (RAG) system. The application enables users to interact with a RAG API to:

- Conduct AI-powered chats with context from their uploaded documents
- Upload and manage documents to be integrated into the knowledge graph
- Insert word glossaries to improve LLM output relevance and accuracy

## Features

### Chat System

- Real-time conversational interface with an AI assistant
- Context-aware responses drawing from uploaded document information
- Chat history management and organization

### Document Management

- Document upload interface with drag-and-drop functionality
- Document listing and search capabilities

### User Authentication

- User registration and login
- Protected routes requiring authentication
- Password reset functionality

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **UI Components**: Heroicons, Material Tailwind
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── components/       # Reusable UI components
├── configs/          # Configuration files
├── contexts/         # React context providers
├── data/             # Mock data for development
├── layouts/          # Page layout components
├── pages/            # Application pages
│   ├── auth/         # Authentication pages
│   ├── chat/         # Chat interface pages
│   ├── document/     # Document management pages
│   └── settings/     # User settings pages
├── routes/           # Routing configuration
├── services/         # API services
│   ├── api/          # Domain-specific API calls
│   └── axios/        # Axios configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16.x or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/YourAI.git
   cd YourAI/client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env.local` file in the client directory with the following variables:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## API Integration

The frontend communicates with a backend API that provides:

- Document processing and storage (PDF handling)
- Knowledge graph integration for RAG functionality
- Authentication services
- Chat history persistence

API base URL is configured in the `.env` file and can be modified for different environments.

## Development Notes

### Demo Mode

The application includes a demo mode (controlled by `isDemo` in `src/configs/app.ts`) that bypasses actual authentication for development purposes.

### Mock Data

For development and testing, the application includes mock data for chats and documents in the `src/data/mockData.ts` file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

No any Licenses yet.
