# TODO

- we wil have a type for both the retrieve data and the return data of every ajax call
- UI components will accept basic procedures that they will auto call on submit(update/save), and delete. Think forms and tables.

# ENHANCEMENTS - MAYBE

9. Event Hooks
   Introduce event hooks (beforeEnter, afterEnter, beforeLeave) for routes to provide more control over the routing process, such as animations or data fetching.

10. Nested Route Parameters
    Improve handling of nested route parameters, allowing more complex URL structures with deeply nested routes and corresponding parameters.

11. Route Path Normalization
    Normalize route paths to handle trailing slashes, case sensitivity, and other inconsistencies to ensure consistent matching.

12. Custom URL Matching
    Allow custom URL matching functions, enabling more complex patterns and conditions for route matching beyond simple path parameters.

13. Support for Query String Serialization
    Enhance query string handling by supporting serialization and deserialization of more complex data structures, like arrays and nested objects.

14. Persistent State Across Routes
    Implement mechanisms to maintain and share state across routes, useful for features like form preservation or multi-step processes.

15. Route Change Observers
    Introduce observers for route changes to trigger actions or state updates in other parts of the application when the route changes.

# Data Fetching / Routing / State

Leverage the state management library you’ve already built to handle data fetching and state changes related to routing. This approach keeps your data logic separate from your routing logic, maintaining a clear separation of concerns.

How to Implement:

    Initialize State: Use your state management library to create a store that holds the fetched data for different routes.
    Route Actions: Modify your RouteAction type to include data fetching logic. When a route is matched, the corresponding action can trigger data fetches and update the store.
    Middleware for Fetching: Create middleware that checks if data for a route needs to be fetched before navigating. This middleware can update the store with fetched data.
    Skeleton Loading: Implement a mechanism to show a loading state or skeleton screen while data is being fetched.

2. Separate Data Fetching Library

Create a separate library dedicated to handling data fetching for routes. This library can work in tandem with your router to ensure data is fetched as needed without overloading the router with additional responsibilities.

How to Implement:

    Fetch Manager: Develop a data fetching manager that listens to route changes and triggers data fetches based on the current route.
    Route Metadata: Define metadata for each route that includes data fetching requirements. The data fetching manager uses this metadata to decide which data to fetch.
    Integration: Integrate the fetch manager with your router by adding hooks or callbacks that get executed on route changes.

3. Hybrid Approach

Combine the above two approaches to get the best of both worlds. Use your state management library for state handling and a separate module for data fetching, ensuring clear boundaries between data logic and routing logic.

How to Implement:

    State Management: Use your state management library to manage the fetched data and other state changes.
    Data Fetching: Create a data fetching utility that interacts with both the router and the state management library. This utility can fetch data based on the current route and update the state accordingly.
    Middleware Integration: Utilize middleware in your router to handle pre-fetching of data and updating the state before rendering the route.
