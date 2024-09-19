// TODO: handle 404s '*'
// TODO: add try/catch in router

type RouterOptions = {};

type RouteAction = (query?: { [key: string]: string }) => {
  skeleton: string;
  loadModule: () => Promise<HTMLElement>;
};

type Routes = {
  [path: string]: RouteAction;
};

type MatchedRoute = {
  action: RouteAction;
  query?: { [key: string]: string };
  hashString?: string;
} | null;

type ParsedQuery = {
  [key: string]: string;
};

type Middleware = (params: {
  next: Function;
  path: string;
}) => Promise<void> | void;

function stringToElement(htmlString: string): HTMLElement {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild as HTMLElement;
}

function createRouter(options?: RouterOptions) {
  const routes: Routes = {};
  const middlewares: Array<Middleware> = [];
  const appRoot: HTMLElement | null = document.getElementById("app");

  function parseQuery(queryString: string): ParsedQuery {
    if (!queryString) return {};

    return queryString
      .substring(1)
      .split("&")
      .reduce((acc, pair) => {
        let [key, value] = pair.split("=");

        key = decodeURIComponent(key);
        value = decodeURIComponent(value || "");

        // array paramaters check
        if (key.endsWith("[]")) {
          key = key.substring(0, key.length - 2);

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(value);

          return acc;
        }

        // same param check
        if (acc[key]) {
          if (!Array.isArray(acc[key])) {
            acc[key] = [acc[key]];
          }

          acc[key].push(value);

          return acc;
        }

        // default
        if (value === "true" || value === "false") {
          acc[key] = value === "true";
        } else if (!isNaN(Number(value))) {
          acc[key] = Number(value);
        } else {
          acc[key] = value;
        }

        return acc;
      }, {} as { [key: string]: any });
  }

  function matchRoute(path: string): MatchedRoute {
    const routePaths: string[] = Object.keys(routes);

    for (const routePath of routePaths) {
      const regexStr = routePath.replace(/:[^\s/]+/g, "([^/]+)");
      const regex = new RegExp(`^${regexStr}$`);

      if (regex.test(path)) {
        return {
          action: routes[routePath],
        };
      }
    }

    return null;
  }

  function linkHandler(e: MouseEvent) {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.target instanceof HTMLElement &&
      e.target.tagName.toLowerCase() === "a"
    ) {
      return false;
    }

    let location =
      e.target instanceof HTMLElement && e.target.getAttribute("href");
    if (typeof location === "undefined" || location === null) {
      return false;
    }

    if (
      typeof location === "string" &&
      location.match(/^(http|https)/) &&
      typeof URL !== "undefined"
    ) {
      try {
        const u = new URL(location);
        location = u.pathname + u.search;
      } catch (err) {}
    }

    e.preventDefault();
    e.stopPropagation();

    if (typeof location === "string") {
      navigate(location);
    }
  }

  function updateLinks() {
    [...document.querySelectorAll("a")].forEach((link) => {
      link.removeEventListener("click", linkHandler);
      link.addEventListener("click", linkHandler);
    });
  }

  function updateContent(content: HTMLElement): void {
    if (appRoot) {
      appRoot.innerHTML = "";

      appRoot.appendChild(content);
    }
  }

  async function router(): Promise<void> {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const query = parseQuery(url.search);

    const runMiddlewares = async (index: number): Promise<void> => {
      if (index < middlewares.length) {
        await middlewares[index]({
          next: async () => await runMiddlewares(index + 1),
          path,
        });

        return;
      }

      const matchedRoute = matchRoute(path);

      if (matchedRoute) {
        const { skeleton, loadModule } = matchedRoute.action(query);

        updateContent(stringToElement(skeleton));

        const content = await loadModule();

        updateContent(content);

        updateLinks();

        return;
      }
    };

    await runMiddlewares(0);
  }

  window.addEventListener("popstate", () => {
    router().catch((error) => {
      console.log("Router error:", error);
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    updateLinks();
  });

  // Public APIs
  //----------------------------
  function on(path: string, action: RouteAction): void {
    const routePath = path || "/";
    routes[routePath] = action;
  }
  function navigate(url: string): void {
    history.pushState(null, "", url);
    router().catch((error) => {
      console.log("Router error:", error);
    });
  }
  function use(middleware: Middleware): void {
    middlewares.push(middleware);
  }

  return {
    on,
    navigate,
    use,
  };
}

export { createRouter };
