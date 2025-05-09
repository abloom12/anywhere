// // In #registerFileRoutes

// // ... (layoutMap creation remains similar)

// for (const [filePath, pageLoader] of Object.entries(pages)) {
//   const parts = filePath
//       .replace(STRIP_LEADING, '')
//       .replace(STRIP_TS_EXT, '')
//       .toLowerCase()
//       .split('/');

//   const fileName = parts.pop()!;
//   const routeSegments = (
//       fileName === 'index' ? parts : [...parts, fileName]
//   ).map(seg =>
//       seg
//           .replace(CAMEL_TO_DASH1, '$1-$2')
//           .replace(CAMEL_TO_DASH2, '$1-$2'),
//   );

//   const routePath = `/${routeSegments.filter(p => !GROUP_SEGMENT.test(p)).join('/')}`;

//   // Determine layouts for this specific routePath
//   const routeLayoutLoaders: (() => Promise<any>)[] = [];
//   let currentPathForLayoutLookup = '';
//   // Iterate up the directory structure from the page's directory
//   // Or iterate through segments of the routePath to find matching layouts in layoutMap
//   for (let i = 0; i < routeSegments.length; i++) { // Or up to routeSegments.length - 1 for parent layouts
//       currentPathForLayoutLookup += (currentPathForLayoutLookup ? '/' : '') + routeSegments[i];
//       // Adjust key for layoutMap if it doesn't start with '/'
//       const layoutKey = `/${currentPathForLayoutLookup.replace(/\/index$/, '')}`.replace(/\/$/, '') || '/'; // Normalize
//       const layoutLoader = layoutMap[layoutKey === '/' ? '' : layoutKey]; // layoutMap keys are like '', '/dashboard'
//       if (layoutLoader) {
//           routeLayoutLoaders.push(layoutLoader);
//       }
//   }

//   // Store this with your route definition
//   // this.routeTrie.add(routePath, { pageLoader, layoutLoaders: routeLayoutLoaders });
//   // Or modify loaders to store an object
//   this.loaders[routePath] = {
//       page: pageLoader,
//       layouts: routeLayoutLoaders, // Ordered from outermost to innermost typically
//   };

//   this.routeTrie.add(routePath); // Keep Trie for path matching

//   console.log(`Registered Route: ${routePath}`);
//   console.log('Page Loader:', pageLoader);
//   console.log('Associated Layout Loaders:', routeLayoutLoaders.length);
// }

// // In #mountRoute
// async #mountRoute(path: string, requestId: number) {
//   const routeInfo = this.loaders[path];
//   if (!routeInfo || !routeInfo.page) {
//       console.error(`No page loader registered for ${path}`);
//       return;
//   }

//   try {
//       // 1. Load all layouts
//       const loadedLayouts = [];
//       // Decide order: typically, root layout first, then progressively deeper.
//       // If routeLayoutLoaders is [rootLayoutLoader, dashboardLayoutLoader], render root then dashboard.
//       for (const layoutLoader of routeInfo.layouts) {
//           if (requestId !== this.currentRequestId) {
//               console.warn('Stale transition—aborting during layout load:', path);
//               return;
//           }
//           const layoutModule = await layoutLoader();
//           loadedLayouts.push(new layoutModule.default()); // Assuming layouts are classes with render()
//       }

//       // 2. Load the page
//       if (requestId !== this.currentRequestId) {
//           console.warn('Stale transition—aborting before page load:', path);
//           return;
//       }
//       const pageModule = await routeInfo.page();
//       const PageClass = pageModule.default;
//       const pageInstance = new PageClass(); // Pass query data if needed

//       if (requestId !== this.currentRequestId) {
//           console.warn('Stale transition—aborting before mount:', path);
//           return;
//       }

//       // 3. Render (nested)
//       this.rootElement.innerHTML = '';
//       let currentElementToRender = pageInstance.render();

//       // Render layouts from innermost to outermost, or manage slots
//       // This is a common pattern: the innermost layout wraps the page,
//       // the next layout wraps the previous one, and so on.
//       // Or, layouts have designated "slots" (e.g., <router-outlet></router-outlet> or a specific ID)
//       // where the child content (either next layout or page) goes.

//       // Example assuming layouts have a render method that accepts child content
//       // or a specific element (e.g., this.contentSlot) where the child is appended.
//       // This requires your layout components to be designed for nesting.

//       let finalDom = pageInstance.render(); // The page content

//       if (loadedLayouts.length > 0) {
//           // Assuming layouts have a `render(childContent?: HTMLElement)` method
//           // or a way to inject content. This part is highly dependent on your
//           // component/templating strategy for layouts.
//           // Let's assume a simple model where a layout has a <slot> or a specific
//           // element to append children to.

//           // Simplistic nesting:
//           // Outermost layout is the first in `loadedLayouts` if sorted that way.
//           // Or last if you want to build from page outwards.
//           // Let's assume layouts have a child container.

//           let currentContent = pageInstance.render();
//           for (let i = loadedLayouts.length - 1; i >= 0; i--) {
//               const layoutInstance = loadedLayouts[i];
//               // This is pseudo-code. Your layout needs a way to accept child content.
//               // e.g., layoutInstance.setContent(currentContent) and then layoutInstance.render()
//               // or layoutInstance.render() returns an element with a specific slot.
//               const layoutElement = layoutInstance.render(); // Assume render creates the layout structure
//               const slot = layoutElement.querySelector('router-outlet') || layoutElement.querySelector('[data-layout-slot]') || layoutElement; // Fallback to appending to layout itself
//               slot.innerHTML = ''; // Clear previous content if any
//               slot.appendChild(currentContent);
//               currentContent = layoutElement;
//           }
//           this.rootElement.appendChild(currentContent);

//       } else {
//           this.rootElement.appendChild(finalDom);
//       }

//   } catch (error) {
//       console.error(`Failed to load or mount route ${path}:`, error);
//       // Handle error, maybe show an error page
//   }
// }
