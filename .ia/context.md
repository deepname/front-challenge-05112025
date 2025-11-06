# Create a complete Nuxt 4 news browser application following modern best practices in architecture, performance, and code organization.

## Functional Requirements

### Main Page

Infinite Scrolling (Optimized):
Implement efficient, low-memory infinite scrolling for fetching and rendering news from a provided API.

Search Functionality:
Integrate a search input that filters news using the API’s search endpoint.
The query must:

Update the results in real time.

Be synchronized with the URL (?q= parameter).

Favorites Management:
Allow users to add or remove articles from a favorites list.
Favorites must be persisted in Local Storage across sessions.

Favorites Page

A dedicated route (/favorites) that lists all saved favorite articles.
Users should be able to view, remove, or navigate back to the main page.

### Architectural & Technical Requirements

1. Component-Based Architecture

    Use clean, reusable Vue components with clear responsibility, such as:

    NewsCard.vue
    SearchBar.vue
    FavoriteButton.vue

2. Centralized State Management (Pinia)

    Create two dedicated stores:

    newsStore

    Handles articles, pagination, loading state, and API fetching.

    favoritesStore

    Manages favorite articles and persists data using Local Storage.

3. Nuxt 4 Composables

    Implement reusable composables for common logic:

    useNewsApi() → Handles all API interactions.
    useUrlSync() → Manages synchronization between reactive states and URL parameters.
    useInfiniteScroll() → Encapsulates intersection observer or scroll-based loading logic.

4. Modular Project Structure

    Organize the code in a clean, modular directory layout:

```text
    /components
    ├── NewsCard.vue
    ├── SearchBar.vue
    ├── FavoriteButton.vue
    /composables
    ├── useNewsApi.ts
    ├── useUrlSync.ts
    ├── useInfiniteScroll.ts
    /pages
    ├── index.vue
    ├── favorites.vue
    /stores
    ├── newsStore.ts
    ├── favoritesStore.ts
```

5. Examples api Calls

    GET /:page` to get a given page with 30 news items

    example Json output:

    ```text
        title: An eBPF Loophole: Using XDP for Egress Traffic
        url: https://loopholelabs.io/blog/xdp-for-egress-traffic
        score: 225
        user: loopholelabs
        age: 20 hours ago
        comments: 70
    ```

    GET /search` to search for news items matching a text sent on the query string.

    example Json output:

    ```text
        title: ChatGPT terms disallow its use in providing legal and medical advice to others
        url: https://www.ctvnews.ca/sci-tech/article/openai-updates-policies-so-chatgpt-wont-provide-medical-or-legal-advice/
        score: 293
        user: randycupertino
        age: 14 hours ago
        comments: 280
    ```

6. Expected Output

    Please provide:

    A high-level project structure overview (as shown above or with adjustments).
    Key illustrative code snippets, such as:
    A basic Pinia store (newsStore or favoritesStore).
    A composable (e.g., useInfiniteScroll or useUrlSync).
    A Vue component demonstrating favorite management (e.g., FavoriteButton.vue).

7. Additional Notes

    Follow Nuxt 4 conventions and Vue 3 Composition API style.
    Ensure readability, modularity, and performance optimization.
    Focus on clarity and separation of concerns (UI, logic, state).
    KISS and DRY Criteria.
