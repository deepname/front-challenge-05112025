# 📰 News Browser - Atomic Design Component Library

A modern Vue 3 + Nuxt 4 application featuring an **atomic design component library** and an **infinite scroll news browser** with favorites functionality.

## 🎯 Project Overview

This project demonstrates two key architectural patterns:

1. **🧩 Atomic Design Component Library** - A scalable, reusable component system
2. **📱 Infinite Scroll News Application** - A Hacker News-style browser with search and favorites

## 📁 Project Structure

```
├── 🧩 components/               # Atomic Design Component Library
│   ├── atoms/                   # Basic reusable components
│   │   ├── BaseButton.vue       # Styled buttons with variants
│   │   ├── BaseInput.vue        # Form inputs with sizes
│   │   └── BaseLink.vue         # Navigation links
│   ├── molecules/               # Simple component combinations
│   │   ├── SearchInput.vue      # Search bar component
│   │   └── FavoriteToggle.vue   # Favorite star button
│   ├── organisms/               # Complex UI components
│   │   ├── ArticleCard.vue      # News article display
│   │   └── PageHeader.vue       # Page headers with actions
│   └── templates/               # Page layout templates
│       └── AppLayout.vue        # Main app layout
├── 📖 pages/                    # Application pages
│   ├── index.vue                # News listing with infinite scroll
│   └── favorites.vue            # User favorites page
├── 🏪 stores/                   # Pinia state management
│   ├── newsStore.ts             # News data and pagination
│   └── favoritesStore.ts        # User favorites (localStorage)
├── 🎨 assets/                   # Styles and resources
│   ├── _variables.scss          # Design tokens
│   └── main.scss               # Global styles
├── 📚 types/                    # TypeScript definitions
└── 📖 composables/              # Reusable Vue composables
    └── useUrlSync.ts            # URL state synchronization
```

## 🧩 Atomic Design Architecture

### Atoms (Building Blocks)

- **BaseButton** - Reusable buttons with variants (`primary`, `secondary`, `ghost`) and sizes (`sm`, `md`, `lg`)
- **BaseInput** - Form inputs with size variants and consistent styling
- **BaseLink** - Navigation links styled consistently with buttons

### Molecules (Simple Combinations)

- **SearchInput** - Search bar using `BaseInput` with enhanced styling
- **FavoriteToggle** - Favorite button using `BaseButton` with Pinia store integration

### Organisms (Complex Components)

- **ArticleCard** - Complete news article display using `BaseLink` and `FavoriteToggle`
- **PageHeader** - Page headers with title and action slots

### Templates (Page Layouts)

- **AppLayout** - Main application layout with header, search, and content slots

## 📰 Application Features

### Infinite Scroll News Browser

- **Real-time news fetching** from Hacker News API
- **Infinite scroll pagination** with automatic loading
- **URL-synchronized search** - Search terms persist in URL
- **Responsive design** optimized for mobile and desktop

### Favorites System

- **Star/unstar articles** with visual feedback
- **Persistent favorites** stored in localStorage
- **Dedicated favorites page** for saved articles
- **Real-time favorite status** across the app

### Search Functionality

- **Live search** with URL synchronization
- **Debounced search** for performance
- **Search state persistence** across page reloads

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd front-challenge

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Component Development

```bash
# Start Storybook for component development
npm run storybook

# Open http://localhost:6006
```

## 🛠️ Development Commands

### Code Quality

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Check code formatting
npm run format

# Auto-format code
npm run format:fix

# Type checking
npm run typecheck
```

### Testing

```bash
# Run tests
npm run test:ut

# Run tests with coverage
npm run test:ut:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI debugging
npm run test:e2e:ui
```

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Build Storybook
npm run build-storybook
```

## 🏗️ Technical Stack

- **Framework**: Nuxt 4 (Vue 3 + Nitro)
- **Language**: TypeScript
- **Styling**: SCSS with CSS Modules
- **State Management**: Pinia
- **Component Architecture**: Atomic Design
- **Testing/Documentation**: Storybook
- **Code Quality**: ESLint + Prettier
- **Build Tool**: Vite

## 🎨 Design System

### Colors & Typography

View the complete design system in Storybook under "Design Tokens" or check `assets/_variables.scss`.

### Component API Examples

#### Using Atoms

```vue
<BaseButton variant="primary" size="md" @click="handleClick">
  Click Me
</BaseButton>

<BaseInput v-model="searchQuery" placeholder="Search..." />

<BaseLink to="/favorites" variant="primary">
  Go to Favorites
</BaseLink>
```

#### Using Molecules

```vue
<SearchInput v-model="query" />

<FavoriteToggle :article="article" />
```

#### Using Organisms

```vue
<PageHeader title="My Page">
  <template #actions>
    <BaseLink to="/">Home</BaseLink>
  </template>
</PageHeader>

<ArticleCard :article="newsArticle" />
```

#### Using Templates

```vue
<AppLayout>
  <template #header>
    <PageHeader title="News" />
  </template>

  <template #search>
    <SearchInput v-model="query" />
  </template>

  <!-- Main content -->
  <ArticleCard v-for="article in articles" :article="article" />
</AppLayout>
```

## 📊 API Integration

The app integrates with the Hacker News API through a Nuxt proxy:

- **Base URL**: `http://localhost:4000` (proxied to HN API)
- **Endpoints**:
  - `GET /page/:number` - Fetch paginated news
  - `GET /search?text=:query` - Search news articles

## 🧪 Testing & Documentation

- **Storybook**: Interactive component documentation at `http://localhost:6006`
- **Component Stories**: Each component has comprehensive stories with controls
- **Type Safety**: Full TypeScript coverage with strict mode enabled

## 📈 Performance Features

- **Lazy Loading**: Components auto-imported by Nuxt
- **Code Splitting**: Automatic route-based splitting
- **Optimized Builds**: Tree-shaking and minification
- **Fast Refresh**: Hot module replacement in development

## 🤝 Contributing

1. Follow the atomic design principles
2. Add Storybook stories for new components
3. Ensure TypeScript types are properly defined
4. Run `npm run lint` and `npm run format` before committing
5. Test components in Storybook before integrating

## 📄 License

This project is part of a front-end challenge and is for educational purposes.

---

**Built with ❤️ using Nuxt 4, Vue 3, and Atomic Design principles**
