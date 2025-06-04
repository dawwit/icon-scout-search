# IconScout Search

A modern, performant icon search application built with Nuxt 3, implementing the IconScout API for high-quality icon discovery.

## 🚀 Features

- **Server-Side Rendering (SSR)** - Optimized for performance and SEO
- **Modern UI** - Built with shadcn/nuxt and Tailwind CSS
- **Type Safety** - Full TypeScript implementation with strict mode
- **State Management** - Pinia for reactive state management
- **Favorites System** - Save and manage favorite assets
- **Performance** - Optimized for Core Web Vitals
- **Real API Integration** - Uses IconScout REST API v3
- **Responsive Design** - Mobile-first approach with touch optimization

## 🛠 Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS + shadcn/nuxt
- **Language**: TypeScript (strict mode)
- **State Management**: Pinia
- **Testing**: Vitest (unit) + Playwright (E2E) - *Setup ready*
- **Validation**: Zod
- **Linting**: ESLint
- **API**: IconScout REST API v3

## 🔑 API Setup

This application uses the IconScout REST API v3. To get started:

1. **Get API Credentials**:
   - Sign up at [IconScout](https://iconscout.com)
   - Navigate to [API settings](https://iconscout.com/api)
   - Generate your Client ID and Client Secret

2. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```bash
   # Required for search functionality
   ICONSCOUT_CLIENT_ID=your_client_id_here
   
   # Required for download functionality (optional)
   ICONSCOUT_CLIENT_SECRET=your_client_secret_here
   
   # Site URL for SEO (optional)
   NUXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **API Features**:
   - **Search**: Browse 8.5M+ icons, illustrations, and 3D assets
   - **Filtering**: By category, style, price, and more
   - **Download**: Direct download with proper authentication
   - **Real-time**: Live search with debouncing and caching

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your IconScout API credentials

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run unit tests (setup ready)
npm run test:unit

# Run E2E tests (setup ready)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run all tests
npm test
```

*Note: Test files are ready to be implemented following TDD approach*

## 🔧 Development

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📁 Project Structure

```
├── assets/css/          # Global styles and CSS variables
├── components/          # Vue components
│   └── search/         # Search-related components
├── composables/         # Vue composables (favorites management)
├── constants/           # Application constants
├── docs/               # Documentation and API reference
├── pages/              # Nuxt pages (file-based routing)
├── public/             # Static assets
├── server/             # Server-side API routes
├── stores/             # Pinia stores (search state management)
├── tests/              # Test files (setup ready)
│   ├── unit/          # Unit tests
│   └── e2e/           # End-to-end tests
└── types/              # TypeScript type definitions
```

## 🎯 Key Design Decisions

### Architecture
- **File-based routing** with Nuxt 3 for intuitive navigation
- **Component composition** following Vue 3 best practices
- **Pinia for state management** with reactive stores
- **Separation of concerns** between UI, logic, and data layers

### API Integration
- **Real IconScout API** integration with proper error handling
- **Environment-based configuration** for secure credential management
- **Response transformation** to maintain consistent internal types
- **Caching and optimization** for better performance

### Performance
- **SSR by default** for optimal initial page load
- **Image optimization** with @nuxt/image
- **Font optimization** with @nuxt/fonts
- **Touch optimization** for mobile devices
- **Prerendering** for static content

### Developer Experience
- **TypeScript strict mode** for maximum type safety
- **ESLint configuration** for consistent code quality
- **Test-driven development** setup ready
- **Conventional commits** for clear git history

## 🌐 SEO & Accessibility

- Semantic HTML structure
- Proper meta tags and Open Graph support
- ARIA labels and keyboard navigation
- Color contrast compliance
- Screen reader optimization
- Mobile-first responsive design

## 📱 Mobile Optimization

- Touch-friendly interface with proper touch targets
- Responsive design with mobile-first approach
- Optimized performance for mobile devices
- Touch gesture support

## 📝 Contributing

1. Follow conventional commit format
2. Write tests before implementing features (TDD approach)
3. Ensure TypeScript strict compliance
4. Maintain WCAG accessibility standards
5. Document architectural decisions

## 📄 License

This project is for educational purposes and follows IconScout's API terms of service.
