// import "./style.css";

// import { createRouter } from "./lib/router";

// const router = createRouter();

// // let authToken: string | null = null;

// // router.use(async ({ next, path }) => {
// //   if (!authToken && path !== "/login") {
// //     router.navigate("/login");
// //     return;
// //   }

// //   await next();
// // });

// // router.on("/login", () => {
// //   return {
// //     skeleton: "<div>Loading...</div>",
// //     loadModule: async () => {
// //       await new Promise((resolve) => setTimeout(resolve, 5000));

// //       const element = document.createElement("div");
// //       element.innerHTML = `<h1>Login Page</h1>`;

// //       return element;
// //     },
// //   };
// // });

// // router.on("/", () => {
// //   // can do stuff here
// //   return {
// //     skeleton: "<div>Home Loading...</div>",
// //     loadModule: async () => {
// //       // grab data needed for user interactivty
// //       const element = document.createElement("div");
// //       element.innerHTML = `<h1>Home Page</h1>`;
// //       return element;
// //     },
// //   };
// // });

// router.on("/about", () => {
//   would need to get skeleton here before return
//   return {
//     skeleton: "<div>About Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>About Page</h1>`;
//       return element;
//     },
//   };
// });

// router.on("/contact", () => {
//   return {
//     skeleton: "<div>Contact Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>Contact Page</h1>`;
//       return element;
//     },
//   };
// });

// router.on("/user/:id", (params) => {
//   return {
//     skeleton: "<div>User Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>User Page for ID: ${params?.id}</h1>`;
//       return element;
//     },
//   };
// });

// router.on("/product/:category/:id", (params) => {
//   return {
//     skeleton: "<div>Product Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>Product Page for Category: ${params?.category} and ID: ${params?.id}</h1>`;
//       return element;
//     },
//   };
// });

// router.on("/settings/:section?", (params) => {
//   return {
//     skeleton: "<div>Settings Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>Settings Page for Section: ${
//         params?.section || "General"
//       }</h1>`;
//       return element;
//     },
//   };
// });

// router.on("/blog/*", () => {
//   return {
//     skeleton: "<div>Blog Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>Blog Page</h1>`;
//       return element;
//     },
//   };
// });

// router.on("/admin/*", () => {
//   return {
//     skeleton: "<div>Admin Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>Admin Page</h1>`;
//       return element;
//     },
//   };
// });

// router.on("*", () => {
//   return {
//     skeleton: "<div>Loading...</div>",
//     loadModule: async () => {
//       const element = document.createElement("div");
//       element.innerHTML = `<h1>Page Not Found</h1>`;
//       return element;
//     },
//   };
// });

// window.addEventListener("DOMContentLoaded", () => {
//   router.navigate(window.location.pathname);
// });

// // // Default configuration for common properties
// const defaultFieldConfig = {
//   required: false,
//   disabled: false,
//   includeBlankOption: false,
//   hidden: false,
// };

// // // Helper functions for common field types
// const field = {
//   checkbox: (label, id, config = {}) => ({
//     type: "checkbox",
//     label,
//     id,
//     ...defaultFieldConfig,
//     ...config,
//   }),
//   time: (label, id, config = {}) => ({
//     type: "time",
//     label,
//     id,
//     ...defaultFieldConfig,
//     ...config,
//   }),
//   select: (label, id, config = {}) => ({
//     type: "select",
//     label,
//     id,
//     ...defaultFieldConfig,
//     ...config,
//   }),
//   textarea: (label, id, config = {}) => ({
//     type: "textarea",
//     label,
//     id,
//     ...defaultFieldConfig,
//     ...config,
//   }),
//   number: (label, id, config = {}) => ({
//     type: "number",
//     label,
//     id,
//     ...defaultFieldConfig,
//     ...config,
//   }),
//   attachment: (label, id, config = {}) => ({
//     type: "attachment",
//     label,
//     id,
//     ...defaultFieldConfig,
//     ...config,
//   }),
//   input: (label, id, config = {}) => ({
//     type: "attachment",
//     label,
//     id,
//     ...defaultFieldConfig,
//     ...config,
//   }),
// };

// // // Usage example with simplified syntax
// // new Form({
// //   fields: [
// //     field.checkbox("Confidential", "confidential"),
// //     field.time("Start Time", "startTime", { required: true }),
// //     field.select(
// //       $.session.applicationName === "Gatekeeper" ? "Bill Code:" : "Serv. Code:",
// //       "serviceCode",
// //       {
// //         required: true,
// //         data: cnData.getServiceBillCodeDropdownData(),
// //         defaultValue: selectedServiceCode,
// //         includeBlankOption: true,
// //       }
// //     ),
// //     field.select("Need", "need", { disabled: true, includeBlankOption: true }),
// //     field.select("Contact", "contact", {
// //       disabled: true,
// //       includeBlankOption: true,
// //     }),
// //     field.select("Vendor", "vendor", {
// //       note: "Requires a consumer(s) to be selected",
// //     }),
// //     field.select("Service Location", "serviceLocation", {
// //       hidden: $.session.applicationName === "Gatekeeper",
// //       disabled: true,
// //     }),
// //     field.textarea("Note", "noteText", {
// //       required: true,
// //       fullscreen: true,
// //       speechToText: true,
// //       note: `Use the new quick insert key for phrases)`,
// //     }),
// //     field.number("Travel Time", "travelTime", {
// //       hidden: $.session.applicationName === "Advisor",
// //       disabled: true,
// //     }),
// //   ],
// //   methods: {
// //     save: {
// //       procedure: "saveNewCaseNotes",
// //       rd: {
// //         //
// //       },
// //     },
// //     update: {
// //       procedure: "updateNewCaseNotes",
// //       rd: {
// //         //
// //       },
// //     },
// //     delete: {
// //       procedure: "deleteNewCaseNotes",
// //       rd: {
// //         //
// //       },
// //     },
// //   },
// // });

// class Form {
//   constructor(parameters) {}
// }

// // normal form
// new Form({
//   fields: [
//     [
//       field.input("text", "firstname", "First Name"),
//       field.input("text", "lastname", "Last Name"),
//     ],
//     field.select("state", "State"),
//     field.textarea("about", "About yourself"),
//   ],
// });

// // multi step form idea 1
// new Form({
//   fields: [
//     [
//       field.input("text", "firstname", "First Name"),
//       field.input("text", "lastname", "Last Name"),
//     ],
//     field.select("state", "State"),
//     field.textarea("about", "About yourself"),
//   ],
//   steps: {
//     0: {
//       name: "step one",
//       fields: ["firstname", "lastname", "state"],
//     },
//     1: {
//       name: "step two",
//       fields: ["about"],
//     },
//   },
// });

// // multi step form idea 2
// new Form({
//   fields: [
//     {
//       name: "step one",
//       fields: [
//         [
//           field.input("text", "firstname", "First Name"),
//           field.input("text", "lastname", "Last Name"),
//         ],
//         field.select("state", "State"),
//       ],
//     },
//     {
//       name: "step two",
//       fields: [field.textarea("about", "About yourself")],
//     },
//   ],
// });
