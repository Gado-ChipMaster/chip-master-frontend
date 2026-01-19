# Chip Master - Web Frontend

> A modern, responsive web application for chip ordering and management with advanced scanning capabilities and real-time services integration.

![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss)

## 🚀 Features

- **User Authentication** - Secure login/registration with OAuth support
- **Product Scanning** - Advanced QR code and image scanning with OCR capabilities
- **Order Management** - Create, track, and manage chip orders
- **Responsive Design** - Fully responsive UI optimized for all devices
- **Real-time Services** - API integration for seamless data synchronization
- **Animation Effects** - Smooth animations powered by Framer Motion
- **Modern Icons** - Comprehensive icon library with Lucide React

## 🛠️ Tech Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 4.1
- **Routing**: React Router DOM 7.12
- **HTTP Client**: Axios 1.13
- **Animations**: Framer Motion 12.26
- **OCR**: Tesseract.js 7.0
- **Webcam**: React Webcam 7.2
- **Icons**: Lucide React 0.562
- **Linting**: ESLint 9.39

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MahmoudG25/chip-master-frontend.git
   cd chip-master-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Configure your API endpoints:
   ```env
   VITE_API_BASE_URL=http://your-api-url
   VITE_GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
   ```

## 🎯 Getting Started

### Development Server
Run the development server with hot module replacement:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output files will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── NavBar.jsx
│   ├── Footer.jsx
│   ├── Scanner.jsx      # QR/Image scanning component
│   └── SliderCompany.jsx
├── Page/               # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── Order.jsx
│   ├── Service.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── PrivacyPolicy.jsx
│   ├── TermsOfService.jsx
│   ├── GoogleCallback.jsx
│   └── Error404.jsx
├── services/           # API and service integration
│   └── api.js          # Axios API client
├── assets/             # Static assets
│   └── brands/
├── App.jsx             # Root component
├── App.css
├── index.css
└── main.jsx            # Application entry point
```

## 🔐 Authentication

The application supports:
- **Email/Password Login** - Traditional authentication
- **Google OAuth** - Secure third-party authentication via `GoogleCallback.jsx`
- **User Registration** - New account creation

## 📱 Key Components

### Scanner Component
Advanced scanning capabilities for product recognition:
- QR code scanning
- Image-based OCR recognition
- Webcam integration

### NavBar & Footer
Responsive navigation and footer components for consistent app layout

### Order Management
Complete order lifecycle handling from selection to tracking

## 🌐 API Integration

All API requests are centralized in [src/services/api.js](src/services/api.js) using Axios. Configure your backend URL in environment variables.

Example API setup:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

## 🎨 Styling

The project uses Tailwind CSS for utility-first styling with custom configurations in `tailwind.config.js`. PostCSS is configured via `postcss.config.js`.

## 🚀 Performance

- **HMR (Hot Module Replacement)** - Instant updates during development
- **Code Splitting** - Automatic route-based code splitting
- **Optimized Builds** - Minified and optimized production bundles

## 📝 ESLint Configuration

The project includes ESLint rules for React best practices. View configuration in `eslint.config.js`.

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push -u origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is part of the Chip Master Suite. All rights reserved.

## 🔗 Related Projects

- **Backend API**: [chip-master-suite backend repository]
- **Chip Master Suite**: Main project documentation

## 💬 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository or contact the development team.

---

**Last Updated**: January 2026  
**Version**: 0.0.0 (Development)
