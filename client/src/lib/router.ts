type RouterOptions = {};

type RouteAction = (
  params?: { [key: string]: string },
  query?: { [key: string]: string }
) => { skeleton: string; loadModule: () => Promise<HTMLElement> };

type Routes = {
  [path: string]: RouteAction;
};

type NestedRoute = {
  path: string;
  action: RouteAction;
  children?: NestedRoute[];
};

type MatchedRoute = {
  action: any;
  params: { [key: string]: string };
  queryString: ParsedQuery;
  hashString: string;
} | null;

type ParsedQuery = {
  [key: string]: string;
};

type Middleware = (params: {
  next: Function;
  path: string;
  query: { [key: string]: string };
}) => Promise<void> | void;

function stringToElement(htmlString: string): HTMLElement {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild as HTMLElement;
}

function createRouter(options?: RouterOptions) {
  const routes: Routes = {};
  const middlewares: Middleware[] = [];

  function parseQuery(queryString: string): ParsedQuery {
    if (!queryString) return {};

    return queryString
      .substring(1)
      .split("&")
      .reduce((acc, pair) => {
        let [key, value] = pair.split("=");
        key = decodeURIComponent(key);
        value = decodeURIComponent(value || "");

        if (key.endsWith("[]")) {
          key = key.substring(0, key.length - 2);
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(value);
        } else if (acc[key]) {
          if (!Array.isArray(acc[key])) {
            acc[key] = [acc[key]];
          }
          acc[key].push(value);
        } else {
          if (value === "true" || value === "false") {
            acc[key] = value === "true";
          } else if (!isNaN(Number(value))) {
            acc[key] = Number(value);
          } else {
            acc[key] = value;
          }
        }

        return acc;
      }, {} as { [key: string]: any });
  }

  function matchRoute(path: string): MatchedRoute {
    const [urlPath, hashFragment] = path.split("#");
    const [pathname, queryString] = urlPath.split("?");
    const queryParams = parseQuery(queryString || "");

    if (pathname === "/") {
      const route = routes["/"];
      if (route) {
        return {
          action: route,
          params: {},
          queryString: queryParams,
          hashString: hashFragment || "",
        };
      }
      return null;
    }

    const segments = pathname.split("/").filter(Boolean);
    const params: { [key: string]: string } = {};
    let matchedRoute: MatchedRoute = null;

    const checkMatch = (routePath: string, segment: string): boolean => {
      const paramNames: string[] = [];
      const regexPath = routePath
        .replace(/:([^\/]+)\??/g, (_, paramName) => {
          paramNames.push(paramName);
          return "([^\\/]+)?";
        })
        .replace(/\*/g, "(.*)");

      const regex = new RegExp(`^${regexPath.replace(/^\//, "")}$`);
      const match = segment.match(regex);

      if (match) {
        paramNames.forEach((paramName, index) => {
          params[paramName] = match[index + 1] || "";
        });
        return true;
      }

      return false;
    };

    const findRoute = (
      currentRoutes: Routes,
      segmentIndex: number
    ): MatchedRoute => {
      if (segmentIndex >= segments.length) {
        if (currentRoutes["*"]) {
          return {
            action: currentRoutes["*"],
            params,
            queryString: queryParams,
            hashString: hashFragment || "",
          };
        }
        return null;
      }

      const segment = segments[segmentIndex];
      for (const route in currentRoutes) {
        if (checkMatch(route, segment)) {
          if (typeof currentRoutes[route] === "function") {
            return {
              action: currentRoutes[route],
              params,
              queryString: queryParams,
              hashString: hashFragment || "",
            };
          } else if (typeof currentRoutes[route] === "object") {
            return findRoute(currentRoutes[route], segmentIndex + 1);
          }
        }
      }

      if (currentRoutes["*"]) {
        return {
          action: currentRoutes["*"],
          params,
          queryString: queryParams,
          hashString: hashFragment || "",
        };
      }

      return null;
    };

    matchedRoute = findRoute(routes, 0);

    return matchedRoute;
  }

  function registerNestedRoutes(
    basePath: string,
    nestedRoutes: NestedRoute[]
  ): void {
    nestedRoutes.forEach(({ path, action, children }) => {
      const fullPath = `${basePath}${path}`.replace(/\/+/g, "/");
      routes[fullPath] = action;
      if (children) {
        registerNestedRoutes(fullPath, children);
      }
    });
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
    const main = document.getElementById("app");

    if (main) {
      main.innerHTML = "";

      main.appendChild(content);
    }
  }

  async function router(): Promise<void> {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const query = parseQuery(url.search);

    const matchedRoute = matchRoute(path);

    const runMiddlewares = async (index: number): Promise<void> => {
      if (index < middlewares.length) {
        await middlewares[index]({
          next: async () => await runMiddlewares(index + 1),
          path,
          query,
        });
        return;
      }

      if (matchedRoute) {
        const { skeleton, loadModule } = matchedRoute.action(
          matchedRoute.params,
          query
        );

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

  // Public APIs
  //----------------------------
  function on(
    path: string,
    action: RouteAction,
    nestedRoutes?: NestedRoute[]
  ): void {
    const routePath = path || "/";
    routes[routePath] = action;

    if (nestedRoutes) {
      registerNestedRoutes(routePath, nestedRoutes);
    }
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

// USAGE EXAMPLE
// import { createRouter } from "./lib/router";
//
// const router = createRouter();
// let authToken: string | null = null;
//
// router.use(async ({ next, path }) => {
//   if (!authToken && path !== "/login") {
//     router.navigate("/login");
//     return;
//   }
//   await next();
// });
//
// router.on("/login", () => {
//   return {
//     skeleton: "<div>Loading...</div>",
//     loadModule: async () => {
//       await new Promise((resolve) => setTimeout(resolve, 5000));
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>Login Page</h1>`;
//       return element;
//     },
//   };
// });
//
// router.on("/", () => {
//   return {
//     skeleton: "<div>Home Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>Home Page</h1>`;
//       return element;
//     },
//   };
// });
//
// router.on("/user/:id", () => {})
// router.on("/product/:category/:id", () => {})
// router.on("/settings/:section?", () => {})
// router.on("/blog/*", () => {})
// router.on("*", () => {}) //// wildcard catch all must be last round added
