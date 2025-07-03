# TransactionCart

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

# Techstack used

1. Angular 19+
2. ngrx/signals
3. Boostrap

## Development server

Command to start and test the app

```bash
npm install
npm run start
npm run test
```

# Assumptions

1. The api is served and stubbed through public folder - http://localhost:4200/api/transaction-cart-data.json

# Folder structure

```
src/app/
├── 📁 core/                          # Shared application infrastructure
│   ├── 📁 components/                # Reusable UI components
│   │   ├── 📁 atoms/                 # Basic UI elements (money, name-badge)
│   │   ├── 📁 molecules/             # Composed components (transaction-item)
│   │   └── 📁 organisms/             # Complex components
│   ├── 📁 model/                     # TypeScript interfaces and types
│   └── 📁 services/                  # Shared application services
├── 📁 features/                      # Feature-specific modules
│   └── 📁 bookkeeping/               # Transaction management feature
│       ├── 📁 components/            # Feature-specific components
│       │   ├── transaction-overview/ # Transaction listing component
│       │   └── transaction-cart/     # Shopping cart component
│       ├── 📁 services/              # Feature services and data mappers
│       │   ├── transaction.service   # HTTP data fetching
│       │   └── transaction.mapper    # Data transformation
│       └── 📁 store/                 # NgRx Signals state management
│           ├── bookkeeping-store     # Main store configuration
│           └── bookkeeping-store.feature # Store feature implementation
├── 📁 mocks/                         # Testing utilities and mock data
└── 📁 public/api/                    # Mock API endpoints
```


# Core Features

1. **Scalable & Maintainable** Modular architecture with clear seperation of concerns, promoting reusability, clarity, and ease of scaling
2. **Smart State Management** Utilised **Signal Store** with a Redux-inspired approach for predictable, reactive data updates.
3. **Reusable Components**: Lightweight, modular components simplify maintenance, testing, and reuse across features.
4. **Error handling**: Implemented error and negative scenarios
5. **Accessibility First**: Meets WCAG guidelines with keyboard navigation and screen reader support for inclusive access.


# Future improvements

1. **Performance Boost**: Smart caching and efficient data fetching on demand
2  **E2E Tests**: Add comprehensive E2E tests for full confidence in the codebase.
