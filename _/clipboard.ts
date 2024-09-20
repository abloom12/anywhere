// type TrieNode = {
//     children: { [key: string]: TrieNode };
//     dynamicChild: TrieNode | null;
//     view: (() => string) | null;
//   };

//   // Helper function to create a new TrieNode
//   function createNode(): TrieNode {
//     return { children: {}, dynamicChild: null, view: null };
//   }

//   class Router {
//     private rootTrie: TrieNode;

//     constructor() {
//       this.rootTrie = createNode(); // Initialize the root trie node
//     }

//     // Automatically assign the root route to '/'
//     createRootRoute(view: () => string): RouteDefinition {
//       const rootRoute: RouteDefinition = {
//         path: '/', // Root route always has '/'
//         view,
//         parentTrieNode: this.rootTrie,
//         children: [],
//       };
//       this.rootTrie.view = view; // Assign the view to the root node
//       return rootRoute;
//     }

//     // Method to create individual routes and add them to the trie
//     createRoute({ path, view, parentRoute }: { path: string; view: () => string; parentRoute: RouteDefinition }): RouteDefinition {
//       const segments = path.split('/').filter(Boolean); // Split the path into segments
//       let node = parentRoute.parentTrieNode;

//       for (const segment of segments) {
//         if (segment.startsWith(':')) {
//           // Handle dynamic segments (e.g., ':id')
//           if (!node.dynamicChild) {
//             node.dynamicChild = createNode();
//           }
//           node = node.dynamicChild;
//         } else {
//           // Handle static segments
//           if (!node.children[segment]) {
//             node.children[segment] = createNode();
//           }
//           node = node.children[segment];
//         }
//       }

//       // Assign the view function to the final node
//       node.view = view;

//       // Create and return the route
//       const route: RouteDefinition = { path, view, parentTrieNode: node, children: [] };
//       parentRoute.children!.push(route); // Add to parent's children array

//       return route;
//     }

//     // Method to handle route navigation
//     navigate(path: string): void {
//       const matchedNode = this.matchRoute(path, this.rootTrie);
//       if (matchedNode && matchedNode.view) {
//         document.getElementById('app')!.innerHTML = matchedNode.view();
//       } else {
//         document.getElementById('app')!.innerHTML = '<h1>404 - Page Not Found</h1>';
//       }
//     }

//     // Helper method to match a route in the trie
//     private matchRoute(path: string, trie: TrieNode): TrieNode | null {
//       const segments = path.split('/').filter(Boolean); // Split the path into segments
//       let node = trie;

//       for (const segment of segments) {
//         if (node.children[segment]) {
//           node = node.children[segment]; // Match static segment
//         } else if (node.dynamicChild) {
//           node = node.dynamicChild; // Match dynamic segment
//         } else {
//           return null; // No match found
//         }
//       }

//       return node.view ? node : null;
//     }
//   }

//   // Example usage
//   const router = new Router();

//   // Define the root route (always associated with '/')
//   const rootRoute = router.createRootRoute(() => `
//     <div class="nav">
//       <a href="/" onclick="navigate('/')">Home</a> |
//       <a href="/about" onclick="navigate('/about')">About</a>
//     </div>
//     <div id="outlet"></div>
//   `);

//   // Define child routes under the root route
//   const homeRoute = router.createRoute({
//     path: '/', // Path for home route
//     view: () => '<h1>Welcome to Home Page!</h1>',
//     parentRoute: rootRoute, // Root route is parent
//   });

//   const aboutRoute = router.createRoute({
//     path: '/about', // Path for about route
//     view: () => '<h1>About Us</h1>',
//     parentRoute: rootRoute, // Root route is parent
//   });

//   // Initial render on DOM load
//   document.addEventListener('DOMContentLoaded', () => {
//     router.navigate('/'); // Navigate to root on load
//   });
