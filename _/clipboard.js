// Router class definition
class Router {
  constructor() {
    this.routes = [];
    this.rootRoute = null;
    this.trie = {};
  }

  createRoute({ path, view, parentRoute = null, rootRoute = false }) {
    const route = { path, view, parentRoute, children: [] };

    if (rootRoute) {
      this.rootRoute = route;
    }

    if (parentRoute) {
      parentRoute.children.push(route);
    }

    this.routes.push(route);
    this.addToTrie(route);

    return route;
  }

  addToTrie(route) {
    const segments = route.path.split("/").filter(Boolean);
    let currentNode = this.trie;

    segments.forEach((segment) => {
      if (segment.startsWith(":")) {
        if (!currentNode[":"]) {
          currentNode[":"] = { paramName: segment.slice(1), children: {} };
        }
        currentNode = currentNode[":"].children;
      } else {
        if (!currentNode[segment]) {
          currentNode[segment] = {};
        }
        currentNode = currentNode[segment];
      }
    });

    currentNode.route = route;
  }

  matchRoute(path) {
    const segments = path.split("/").filter(Boolean);
    let currentNode = this.trie;
    const params = {};

    for (const segment of segments) {
      if (currentNode[segment]) {
        currentNode = currentNode[segment];
      } else if (currentNode[":"]) {
        params[currentNode[":"].paramName] = segment;
        currentNode = currentNode[":"].children;
      } else {
        return null;
      }
    }

    if (currentNode.route) {
      return { route: currentNode.route, params };
    }

    return null;
  }

  navigateTo(path) {
    const match = this.matchRoute(path);

    if (match) {
      this.renderRoute(match.route, match.params);
    } else {
      console.error(`No route matched for path: ${path}`);
    }
  }

  renderRoute(route, params = {}) {
    // Render the parent routes first
    if (route.parentRoute) {
      this.renderRoute(route.parentRoute, params);
    }

    // Render the current route's view
    const viewHtml = route.view(params);

    // Insert the view into the DOM
    // For simplicity, we'll append views to the main container
    const container = document.getElementById("app") || document.body;
    container.innerHTML = viewHtml;
  }

  handleNavigation(path) {
    this.navigateTo(path);
  }
}

// Initialize the router
const router = new Router();

// Home Route
const homeRoute = router.createRoute({
  path: "/",
  view: () => `
      <h1>Home Page</h1>
    `,
  rootRoute: true,
});

// Users Route
const usersRoute = router.createRoute({
  path: "/users",
  view: () => `
      <h1>Users List</h1>
    `,
  parentRoute: homeRoute,
});

// User Detail Route
const userDetailRoute = router.createRoute({
  path: "/users/:id",
  view: (params) => `
      <h1>User ${params.id}</h1>
    `,
  parentRoute: usersRoute,
});

// User Posts Route
const userPostsRoute = router.createRoute({
  path: "/users/:id/posts",
  view: (params) => `
      <h1>Posts by User ${params.id}</h1>
    `,
  parentRoute: userDetailRoute,
});

// User Post Detail Route
const userPostDetailRoute = router.createRoute({
  path: "/users/:id/posts/:postId",
  view: (params) => `
      <h1>Post ${params.postId} by User ${params.id}</h1>
    `,
  parentRoute: userPostsRoute,
});

// Navigation handling
function navigateTo(path) {
  history.pushState({}, "", path);
  router.handleNavigation(path);
}

// Handle browser navigation (back/forward buttons)
window.onpopstate = () => {
  router.handleNavigation(window.location.pathname);
};

// Initial navigation on page load
document.addEventListener("DOMContentLoaded", () => {
  router.handleNavigation(window.location.pathname);
});

// Example links for navigation (you can replace this with your actual navigation logic)
document.body.addEventListener("click", (event) => {
  if (event.target.matches("a[data-link]")) {
    event.preventDefault();
    navigateTo(event.target.getAttribute("href"));
  }
});

// Example usage: Adding some links to the page
const appContainer = document.getElementById("app") || document.body;
appContainer.innerHTML += `
    <nav>
      <a href="/" data-link>Home</a>
      <a href="/users" data-link>Users</a>
      <a href="/users/1" data-link>User 1</a>
      <a href="/users/1/posts" data-link>User 1 Posts</a>
      <a href="/users/1/posts/10" data-link>User 1 Post 10</a>
    </nav>
  `;
