import "./style.css";

import { createStore } from "./lib/store";

const store = createStore({
  name: "Ash Bloomingdale",
  age: 34,
  position: "Develooper",
  isActive: true,
  config: {
    darkMode: true,
    offlineMode: true,
  },
  data: [
    {
      id: 1,
      tag: "one",
    },
    {
      id: 2,
      tag: "two",
    },
    {
      id: 3,
      tag: "three",
    },
    {
      id: 4,
      tag: "four",
    },
  ],
});

store.subscribe(
  (state) => {
    return state.age;
  },
  (selectedState) => {
    console.log(selectedState, "was updated");
  }
);

store.setState((state) => {
  state.age = 40;
});
