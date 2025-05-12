// @ts-nocheck
/* eslint-disable */ // for ESLint
/* tslint:disable */ // for TSLint

// parentElement starts as #root (has no outlet)
// load layout
// append layout to parentElement
// query parentElement for outlet (this will be from the layout we just appended)
// make the oulet we just got the new parentElement
// now load next layout, append it to parentElement (which is now the last layouts outlet)
// query parentElement (last layouts outlet) to get the next outlet down the tree

//TODO: need to know which layouts are already on screen so we don't re render shit
//TODO: ? cache already loaded modules

//* NEW RULE: layout.ts must have page in same dir level to render

//* KEEPING TRACK OF MOUNTED LAYOUTS
//? loop through loader.layouts
//? if loader.layouts[index] === mountedChain[index].path => keep chain move on to next index
//? if loader.layouts[index] !== mountedChain[index].path => remove chain, mount new layout, move on to next index

//? removing chain should remove all chldren
//? if loader.layouts.length > mountedChain.length then we can just mount the next layout
//? if we find a no match then we need to also remove those non matches from mountedChain[]
//? if removing chain also remove all items from that index in mountedChain[] and forward before adding new chains
//? if mounting new layout we need to add it to mountedChain[]

//* Potential Issues
// Single removal is correct—but watch for detached outlets
// Removing this.mountedChain[firstMismatch]?.outlet?.parentElement will yank out the parent layout
// and all its children as intended—but only if every layout truly nests inside its predecessor’s [data-outlet].
// If you ever render things outside that tree (portals, modals, siblings) you’ll need more surgical cleanup or lifecycle hooks.
//? add a destroy or unMount method to layout classes to clean up things like portals, modals or siblings if we ever use those

// Error paths are explicit—good, but consider wrapping await calls in try/catch to present a user-friendly
// error UI rather than letting an uncaught promise rejection bubble up.

function mountRoute(path, requestId) {
  const { page, layoutPaths } = this.routeLoaders[path];
  let parentElement = this.rootElement;

  // Find first layout mismatch index (or full match)
  const mismatchIndex = layoutPaths.findIndex(
    (layoutPath, i) => this.mountedChain[i]?.path !== layoutPath,
  );

  // If no mismatch, all layouts are reused
  const firstMismatch =
    mismatchIndex === -1 ? layoutPaths.length : mismatchIndex;

  // Remove stale layouts from DOM and state
  this.mountedChain[firstMismatch]?.outlet?.parentElement?.remove();
  this.mountedChain.length = firstMismatch;

  // Mount any missing layouts
  for (let i = firstMismatch; i < layoutPaths.length; i++) {
    const layoutPath = layoutPaths[i];
    const layoutLoader = this.layoutLoaders[layoutPath];

    if (!layoutLoader) {
      throw new Error(`No layout loader found for: ${layoutPath}`);
    }

    const layoutModule = await layoutLoader();
    const layoutInstance = new layoutModule.default();
    const layoutEl = layoutInstance.render();

    parentElement.appendChild(layoutEl);

    const outlet =
      layoutEl.querySelector<HTMLElement>('[data-outlet]');
    if (!outlet) {
      throw new Error(
        `Layout "${layoutPath}" must contain a [data-outlet] element.`,
      );
    }

    this.mountedChain.push({ path: layoutPath, outlet });
    parentElement = outlet;
  }

  // Mount the page
  const pageModule = await page();
  const pageInstance = pageModule.default();
  parentElement.appendChild(pageInstance.render());
}
