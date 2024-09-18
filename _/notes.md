# URL Matching:
- Flexible Routing: Paths like /users/foo and /users/foo/ will match the same route.
 -Segment-Based Matching: /users/foo will not match /users/foo/bar; the number of path segments must match exactly.
- Dynamic Segments: The router supports multiple dynamic segments (e.g., /users/:userId/posts/:postId).
- Optional Parameters: Dynamic segments can be optional (e.g., /users/:id?).
- No Match Handling: If an invalid segment is provided, the router will return a "no match" and display a 404 page.

# Navigation:
- Programmatic Navigation: Use router.navigate('/path') to navigate between routes without reloading the page.
- History Management: pushState is used to add new entries to the browser's history stack.
- Link Click Interception: The router intercepts internal <a> link clicks to prevent full page reloads and  - handles navigation within the app.
- External Links: External links (e.g., to a different domain) are handled by the browser normally.

# View Rendering
- Each route should map to a specific view or component that the router will display when the route is matched.
- For routes with dynamic segments (e.g., /users/:id), the router should extract the dynamic values (e.g., id: "123") and pass them to the view for rendering.
- Before Render: You may need to run certain logic (e.g., data fetching) before rendering the view.
- After Render: Once the view is rendered, you might need to handle post-render tasks (e.g., adding event listeners or animations).
- After a route is matched, the router will manipulate the DOM to display the appropriate view.
- This could involve:
    - Updating a specific container (e.g., #app or #content) with the new view.
    - Replacing or injecting new HTML content into the DOM.

# Scroll Position Restoration:
- Optional: You’re considering adding support for restoring scroll position when navigating back and forth.