import './style.css';
import chalk from 'chalk';
import { log } from '@/util/logger';

// import { createStore } from "./lib/store";
// import { createRouter } from "./lib/router";

// const router = createRouter();

// const store = createStore({
//   name: "Ash Bloomingdale",
//   age: 34,
//   position: "Develooper",
//   isActive: true,
//   config: {
//     darkMode: true,
//     offlineMode: true,
//   },
//   data: [
//     {
//       id: 1,
//       tag: "one",
//     },
//     {
//       id: 2,
//       tag: "two",
//     },
//     {
//       id: 3,
//       tag: "three",
//     },
//     {
//       id: 4,
//       tag: "four",
//     },
//   ],
// });

// store.subscribe(
//   (state) => state.age,
//   (selectedState) => {
//     console.log("was updated to", selectedState);
//   }
// );

// store.setState((state) => {
//   state.age = 40;
// });

// router.on("/user", () => {
//   return {
//     skeleton: "<div>User Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>User Page</h1>`;
//       return element;
//     },
//   };
// });

// router.on("/user/:id", (params, query) => {
//   return {
//     skeleton: "<div>User Detail Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>User Detail Page for: ${params} ${query}</h1>`;
//       return element;
//     },
//   };
// });

type Routes = { [path: string]: any };

const routes: Routes = {
  '/': () => ({ loadModule: () => {} }),
  '/users': () => ({ loadModule: () => {} }),
  '/users/:id': () => ({ loadModule: () => {} }),
  '/users/:id/note/:noteID': () => ({ loadModule: () => {} }),
};

function parseQuery(queryString: string): any {
  if (!queryString) return {};

  return queryString
    .substring(1)
    .split('&')
    .reduce(
      (acc, pair) => {
        let [key, value] = pair.split('=');

        key = decodeURIComponent(key);
        value = decodeURIComponent(value || '');

        // array paramaters check
        if (key.endsWith('[]')) {
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
        if (value === 'true' || value === 'false') {
          acc[key] = value === 'true';
        } else if (!isNaN(Number(value))) {
          acc[key] = Number(value);
        } else {
          acc[key] = value;
        }

        return acc;
      },
      {} as { [key: string]: any },
    );
}

function matchRoute(path: string): any | undefined {
  // Extract query parameters

  const keys: string[] = Object.keys(routes);

  log(chalk.yellow('Searching for route match....'));
  for (const key of keys) {
    const regexStr = key.replace(/:[^\s/]+/g, '([^/]+)');
    const regex = new RegExp(`^${regexStr}$`);
    log(`Checking path ${chalk.cyan.bold(path)} against route ${chalk.cyan.bold(key)}`);

    if (regex.test(path)) {
      log(chalk.green('Matched Route Found'));
      log(`Route: ${chalk.red(key)} => ${chalk.red(regexStr)} => ${chalk.red(regex)}`);
      log(`Tested path ${chalk.red(path)} with route regex ${chalk.red(regex)}`);
      log(path.match(regex));

      const matchedRoute = routes[key];
      return matchedRoute;
    }
  }

  return undefined;
}

// Example usage:
// matchRoute("/");
// matchRoute("/users");
matchRoute('/users/86548');
// matchRoute("/users/86548/note/1");
// matchRoute("http://localhost:5173/users#internalLink");
// matchRoute("/?debug=true");
// matchRoute("/users/1234/note/1?view=detail");
// matchRoute("http://localhost:5173/users?active=true&valid=false#internal");
//
// console.log(matchRoute("/users/1234?sort=asc"));
// console.log(matchRoute("/users?active=true&valid=false"));
// console.log(matchRoute("/?debug=true"));
// console.log(matchRoute("/users/1234/note/1?view=detail"));
