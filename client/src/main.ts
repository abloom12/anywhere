import './style.css';

import { createStore } from './store';
import { createRouter } from './router';

const router = createRouter();

const store = createStore({
  name: 'Ash Bloomingdale',
  age: 34,
  position: 'Develooper',
  isActive: true,
  config: {
    darkMode: true,
    offlineMode: true,
  },
  data: [
    {
      id: 1,
      tag: 'one',
    },
    {
      id: 2,
      tag: 'two',
    },
    {
      id: 3,
      tag: 'three',
    },
    {
      id: 4,
      tag: 'four',
    },
  ],
});

store.subscribe(
  state => state.age,
  selectedState => {
    console.log('was updated to', selectedState);
  },
);

store.setState(state => {
  state.age = 40;
});

router.on('/user', () => {
  return {
    skeleton: '<div>User Loading...</div>',
    loadModule: async () => {
      const element = document.createElement('div');
      element.innerHTML = `<h1>User Page</h1>`;
      return element;
    },
  };
});

router.on('/user/:id', params => {
  return {
    skeleton: '<div>User Detail Loading...</div>',
    loadModule: async () => {
      const element = document.createElement('div');
      element.innerHTML = `<h1>User Detail Page for: ${params}</h1>`;
      return element;
    },
  };
});
