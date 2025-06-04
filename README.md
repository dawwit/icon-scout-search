# IconScout Search

A modern, performant icon search application built with Nuxt 3, implementing the IconScout API for high-quality icon discovery.

## 🚀 Features

- **Server-Side Rendering (SSR)** - Optimized for performance and SEO
- **Modern UI** - Built with shadcn/nuxt and Tailwind CSS
- **Type Safety** - Full TypeScript implementation with strict mode
- **Testing** - Unit tests with Vitest and E2E tests with Playwright
- **Accessibility** - WCAG compliant design principles
- **Performance** - Optimized for Core Web Vitals

## 🛠 Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS + shadcn/nuxt
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Validation**: Zod
- **Linting**: ESLint

## 📦 Installation

```bash
# Install dependencies
npm install

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
│   └── ui/             # shadcn/nuxt UI components
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
