# Aurygen Admin

A modern React application built with Vite, featuring a maintainable folder structure and component-based architecture.

## 🚀 Features

- **Modern React 18** with Vite for fast development
- **Component-based architecture** for reusable UI elements
- **Custom hooks** for shared logic
- **Utility functions** for common operations
- **Organized folder structure** for maintainability
- **Global styles** with CSS custom properties
- **TypeScript ready** structure

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   └── index.js        # Component exports
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js
│   └── index.js
├── utils/              # Utility functions
│   ├── api.js          # API helper functions
│   ├── helpers.js      # Common utility functions
│   └── index.js
├── constants/          # Application constants
│   ├── app.js          # App-wide constants
│   └── index.js
├── context/            # React context providers
│   └── index.js
├── services/           # External service integrations
│   └── index.js
├── styles/             # Global styles and themes
│   ├── globals.css     # Global CSS styles
│   └── theme.js        # Theme configuration
└── assets/             # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aurygen-admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Architecture Principles

### Component Organization

- **UI Components**: Basic, reusable components (Button, Input, Modal)
- **Layout Components**: Page structure components (Header, Footer, Sidebar)
- **Feature Components**: Business logic components

### Import Strategy

```javascript
// Import from index files for cleaner imports
import { Button, Layout } from './components';
import { useLocalStorage } from './hooks';
import { formatDate, debounce } from './utils';
import { API_ENDPOINTS, THEMES } from './constants';
```

### Styling Approach

- **Global styles** for base styles and utilities
- **Component-specific CSS** for component styling
- **CSS custom properties** for theming
- **Utility classes** for common patterns

## 🎨 Theming

The application includes a theme system with:

- Color palette with semantic naming
- Consistent spacing scale
- Typography system
- Responsive breakpoints

## 🔧 Customization

### Adding New Components

1. Create component folder in appropriate directory
2. Add component files (JSX, CSS, index.js)
3. Export from main components index

### Adding New Utilities

1. Add function to appropriate utility file
2. Export from utils index
3. Import where needed

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_APP_NAME=Aurygen Admin
```

## 🤝 Contributing

1. Follow the established folder structure
2. Use the existing component patterns
3. Add proper documentation
4. Test your changes

## 📄 License

This project is licensed under the MIT License.
