# Router Library Documentation

This documentation provides a comprehensive guide to using the Router library built with TypeScript. The Router library provides a simple and effective way to handle client-side routing for web applications. This document covers the installation, setup, and usage of the library.

## Table of Contents

- [Usage](#usage)
  - [Creating a Router](#creating-a-router)
  - [Defining Routes](#defining-routes)
  - [Navigating Between Routes](#navigating-between-routes)
  - [Using Middleware](#using-middleware)
- [Functions](#functions)
  - [createRouter](#createrouter)
  - [on](#on)
  - [navigate](#navigate)
  - [use](#use)
- [Utilities](#utilities)
  - [stringToElement](#stringtoelement)
  - [parseQuery](#parsequery)
  - [matchRoute](#matchroute)
  - [updateLinks](#updatelinks)
  - [updateContent](#updatecontent)
- [Events](#events)
  - [popstate](#popstate)
  - [DOMContentLoaded](#domcontentloaded)

## Usage

### Creating a Router

To create a router, use the `createRouter` function. This function initializes the router with optional configurations.

```typescript
import { createRouter } from './path-to-router-file';

const router = createRouter();
```

## Defining Routes

Define routes using the on method. Each route is associated with a path and an action function that returns the skeleton and module to load.

```typescript
router.on('/home', ({ query }) => ({
  skeleton: '<div>Loading...</div>',
  loadModule: async () => {
    const module = document.createElement('div');
    module.innerHTML = 'Home Page Content';
    return module;
  },
}));

router.on('/about', ({ query }) => ({
  skeleton: '<div>Loading...</div>',
  loadModule: async () => {
    const module = document.createElement('div');
    module.innerHTML = 'About Page Content';
    return module;
  },
}));
```

## Navigating Between Routes

Use the navigate method to programmatically navigate between routes.

```typescript
router.navigate('/home');
```

## Using Middleware

Middleware functions can be used to perform actions before a route is resolved. Use the use method to add middleware.

```typescript
router.use(async ({ next, path }) => {
  console.log(`Navigating to ${path}`);
  await next();
});
```

## Functions

### createRouter

The createRouter function initializes the router with optional configurations.

```typescript
function createRouter(options?: RouterOptions): {
  on: (path: string, action: RouteAction) => void;
  navigate: (url: string) => void;
  use: (middleware: Middleware) => void;
};
```

### on

The on method defines a route and its associated action.

```typescript
function on(path: string, action: RouteAction): void;
```

### navigate

The navigate method programmatically navigates to a specified URL.

```typescript
function navigate(url: string): void;
```

### use

The use method adds middleware to the router.

```typescript
function use(middleware: Middleware): void;
```

## Utilities

### stringToElement

The stringToElement function converts an HTML string to an HTMLElement.

```typescript
function stringToElement(htmlString: string): HTMLElement;
```

### parseQuery

The parseQuery function parses a query string into an object.

```typescript
function parseQuery(queryString: string): ParsedQuery;
```

### matchRoute

The matchRoute function matches the current path to a defined route.

```typescript
function matchRoute(path: string): MatchedRoute;
```

### updateLinks

The updateLinks function updates the click event listeners for all `<a>` elements to handle client-side navigation.

```typescript
function updateLinks(): void;
```

### updateContent

The updateContent function updates the content of the application root element with new content.

```typescript
function updateContent(content: HTMLElement): void;
```

## Events

### popstate

The popstate event listener handles the browser's back and forward navigation.

```typescript
window.addEventListener('popstate', () => {
  router().catch(error => {
    console.log('Router error:', error);
  });
});
```

### DOMContentLoaded

The DOMContentLoaded event listener initializes the link handlers when the DOM is fully loaded.

```typescript
window.addEventListener('DOMContentLoaded', () => {
  updateLinks();
});
```

## Example

Here is a complete example of using the Router library:

```typescript
import { createRouter } from './path-to-router-file';

const router = createRouter();

router.on('/home', ({ query }) => ({
  skeleton: '<div>Loading...</div>',
  loadModule: async () => {
    const module = document.createElement('div');
    module.innerHTML = 'Home Page Content';
    return module;
  },
}));

router.on('/about', ({ query }) => ({
  skeleton: '<div>Loading...</div>',
  loadModule: async () => {
    const module = document.createElement('div');
    module.innerHTML = 'About Page Content';
    return module;
  },
}));

router.use(async ({ next, path }) => {
  console.log(`Navigating to ${path}`);
  await next();
});

router.navigate('/home');
```
