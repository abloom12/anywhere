// // - Page Loading and State: The router uses dynamic imports for pages (loader() => import(...) functions) and then calls new PageClass() to mount them.
// // If a user navigates rapidly or triggers multiple route changes in succession, the asynchronous nature of #transitionRoute() could cause
// // race conditions (e.g., a slower-loading page might overwrite a faster one). Proper cancellation or guarding might be needed so only the
// // last navigation action takes effect. Moreover, since each navigation creates a new page instance from scratch, any transient state within
// // pages is lost on re-navigation (which is expected in an SPA, but if certain state should persist, it would need to live in the global store or URL).

// // 1. Navigation Token (Sequence Counter)
// // Maintain a counter on your Router instance (e.g. this.navId).
// // Bump it every time you start a navigation.
// // Capture its value in your async transition, and before you actually mount the new page, check that the captured ID still matches the router’s current navId.
// // If it doesn’t match, you know a newer navigation has begun, so you abandon the old one.
// // Why it works: Any earlier navigate() call that resolves after a later one will compare its stale currentNav against the now-higher this.navId and bail out.
// class Router {
//   private root: HTMLElement;
//   private navId = 0;

//   constructor(root: HTMLElement) {
//     this.root = root;
//     window.addEventListener('popstate', () => this.navigate(location.pathname));
//   }

//   async navigate(path: string) {
//     // 1. Bump the navigation ID
//     this.navId++;
//     const currentNav = this.navId;

//     // 2. Find the route and its loader
//     const route = this.matchRoute(path);
//     if (!route) return this.showNotFound();

//     try {
//       // 3. Load the module (dynamic import)
//       const mod = await route.loader();

//       // 4. Before mounting, verify it’s still the latest nav
//       if (currentNav !== this.navId) {
//         console.log('Navigation superseded — aborting', path);
//         return;
//       }

//       // 5. Teardown old page & mount new
//       this.clearRoot();
//       const PageClass = mod.default;
//       new PageClass(this.root, {
//         /* props */
//       });
//     } catch (err) {
//       // handle or show error
//     }
//   }

//   private clearRoot() {
//     this.root.replaceChildren();
//   }
// }

// // 2. Cancelling In-Flight Data Fetches with AbortController
// // If you’re doing fetch() or other asynchronous tasks inside your pages, you can hook into the same navigation token—or better,
// // wire each page up with its own AbortController—so that when you unmount/transition away, you actively cancel any outstanding requests:
// class DataPage {
//   private abortCtrl = new AbortController();

//   constructor(root: HTMLElement) {
//     this.loadData()
//       .then(data => this.render(data))
//       .catch(err => {
//         if (err.name === 'AbortError') {
//           // request was cancelled; no need to show error
//         } else {
//           console.error(err);
//         }
//       });
//   }

//   private async loadData() {
//     const resp = await fetch('/api/large-data', {
//       signal: this.abortCtrl.signal,
//     });
//     return resp.json();
//   }

//   onUnmount() {
//     // cancel any in-flight fetch
//     this.abortCtrl.abort();
//   }

//   render(data: any) {
//     /* … */
//   }
// }

// // Then, in your router, before starting the next page you can call:
// // before clearing/mounting:
// if (this.currentPage?.onUnmount) {
//   this.currentPage.onUnmount();
// }
