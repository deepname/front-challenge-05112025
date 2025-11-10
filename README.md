# 📰 News Browser - Atomic Design Component Library

A modern [Vue 3](https://vuejs.org/) + [Nuxt 4](https://nuxt.com/) application featuring an **atomic design component library** with [Storybook](https://storybook.js.org/) and an **infinite scroll news browser** with favorites functionality.

## 🎯 Project Overview

This project demonstrates two key architectural patterns:

1. **🧩 Atomic Design Component Library** - A scalable, reusable component system
2. **📱 Infinite Scroll News Application** - A Hacker News-style browser with search and favorites

## 📁 Project Structure

```
├── 🧩 components/               # Atomic Design component library
│   ├── atoms/                   # Base UI primitives (buttons, inputs, links, etc.)
│   ├── molecules/               # Small compositions (SearchInput, FavoriteToggle...)
│   ├── organisms/               # Complex UI blocks (ArticleCard, PageHeader...)
│   ├── templates/               # Layout-level components (AppLayout)
│   └── tokens/                  # Design token helpers, stories and tests
├── 📖 pages/                    # Nuxt page components (news list, favorites)
├── 🏪 stores/                   # Pinia stores (newsStore, favoritesStore)
├── 🎨 assets/                   # Global styles, variables and shared SCSS
├── 📚 types/                    # Shared TypeScript definitions
├── 🔁 composables/              # Reusable Vue composables & tests
├── 🧪 tests/                    # End-to-end Storybook/Playwright tests
├── ⚙️ config/                   # Testing setup files (Vitest setup)
├── 📦 public/                   # Static assets served as-is
└── 🔧 root files                # Nuxt/Vitest configs, Dockerfiles, README, etc.
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

## 🚀 Quick Start With Docker

### 🐳 Docker- Getting Started

To run the project using Docker, make sure you have Docker and Docker Compose installed on your system.

### 🚀 Start the Project

Use docker-compose up with the -d flag to build (if necessary) and run all the services defined in your docker-compose.yml

```bash
docker-compose up
```

### 🛑 Stop the Project

To stop the containers and remove the networks that Docker Compose created, use the following command.

```bash
docker-compose down -v
```

## 🚀 Quick Start without Docker

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

# Install browsers Chromium, Firefox, WebKit(Playwright needs to download the actual browser binaries)
npx playwright install --with-deps
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

**To run the e2e tests, you must have both the backend and the frontend running.**

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
- **Testing/Documentation**: Vitest, Playwright and Storybook
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

## 📚 Component Library & Storybook

- **Storybook**: Interactive component documentation at `http://localhost:6006`
- **Component Stories**: Each component has comprehensive stories with controls
- **Play functions / interaction**: highlights that stories include play functions

## 🧪 Testing & Documentation

- **Unit Tests**: Unit tests using Vitest with happy-dom
- **Playwright**: End-to-end tests using Playwright
- **Type Safety**: Full TypeScript coverage with strict mode enabled

## 📈 Performance Features

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

***Built with ❤️ using Nuxt 4, Vue 3, and Atomic Design principles***
