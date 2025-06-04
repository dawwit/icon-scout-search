# IconScout Search

A modern, performant icon search application built with Nuxt 3, implementing the IconScout API for high-quality icon discovery.

## 🚀 Features

- **Server-Side Rendering (SSR)** - Optimized for performance and SEO
- **Modern UI** - Built with shadcn/nuxt and Tailwind CSS
- **Type Safety** - Full TypeScript implementation with strict mode
- **Testing** - Unit tests with Vitest and E2E tests with Playwright
- **Accessibility** - WCAG compliant design principles
- **Performance** - Optimized for Core Web Vitals
- **Real API Integration** - Uses IconScout REST API v3

## 🛠 Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS + shadcn/nuxt
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest (unit) + Playwright (E2E)
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
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

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
│   ├── search/         # Search-related components
│   └── ui/             # shadcn/nuxt UI components
├── composables/         # Vue composables (including useSearch)
├── docs/               # Documentation and API reference
├── pages/              # Nuxt pages (file-based routing)
├── tests/              # Test files
│   ├── unit/          # Unit tests
│   └── e2e/           # End-to-end tests
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Key Design Decisions

### Architecture
- **File-based routing** with Nuxt 3 for intuitive navigation
- **Component composition** following Vue 3 best practices
- **Pure functions** for business logic to ensure testability
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
- **Prerendering** for static content

### Developer Experience
- **TypeScript strict mode** for maximum type safety
- **ESLint configuration** for consistent code quality
- **Test-driven development** approach
- **Conventional commits** for clear git history

## 🌐 SEO & Accessibility

- Semantic HTML structure
- Proper meta tags and Open Graph support
- ARIA labels and keyboard navigation
- Color contrast compliance
- Screen reader optimization

## 📝 Contributing

1. Follow conventional commit format
2. Write tests before implementing features
3. Ensure TypeScript strict compliance
4. Maintain WCAG accessibility standards
5. Document architectural decisions

## 📄 License

This project is for educational purposes and follows IconScout's API terms of service.
