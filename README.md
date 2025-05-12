# Anywhere 5.0

## Tech Stack

- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [Typescript](https://www.typescriptlang.org/docs/)

## Libraries

- [Chart.js](https://www.chartjs.org/)

## New 5.0 Features

- SPA like routing
- Global state management
- Full UI library
- Typesaftey

## Development Quality of Life Improvements

- Typesafety allows for faster development with less bugs
- No more writting CSS, layout/ui components come with everything baked in
- Static file caching for improved page load

## Terminology

Component: self contained, reusable piece of code that represents a specific part of the user interface, managing its own structure, styling and behavior. A component can be anything from a button to a nav bar to a dash widget.

Lib: a collection of internal libraries, should have one area of focus, for example, dates, colors, text manipulation, etc.

Feature: collection of related code that implements a specific functionality within an application. A feature contains the UI to perform the action, API calls needed to make the action, validation and schemas.

Route: A mapping between a URL path and a handler function or component. Routes are used to define navigation and control which part of the application is displayed for a given URL.

## Files

main.ts => entry point, global stuff here like google stuff, geolocation?
app/app.ts => entry point for anyhere, create router and global store

# Temporary Docs

## pages directory

- Layouts should only be used if at least one page exists that resolves within or beneath that layout's directory.
- Don't treat a layout.ts as its own routable component.
