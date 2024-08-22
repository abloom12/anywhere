import './style.css';

import { createRouter } from './router';
import { Form } from './components/form/Form';

import { cva } from 'class-variance-authority';
import { mergeClasses } from '@/util/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const a = buttonVariants({ variant: 'default', size: 'default' });
const b = mergeClasses(buttonVariants({ variant: 'default', size: 'default' }));
console.log(a);
console.log(b);
console.log(a === b);

// const router = createRouter();

// router.on('/user', () => {
//   return {
//     skeleton: '<div>User Loading...</div>',
//     loadModule: async () => {
//       const element = document.createElement('div');
//       element.innerHTML = `<h1>User Page</h1>`;
//       return element;
//     },
//   };
// });

// router.on('/user/:id', params => {
//   return {
//     skeleton: '<div>User Detail Loading...</div>',
//     loadModule: async () => {
//       const element = document.createElement('div');
//       element.innerHTML = `<h1>User Detail Page for: ${params}</h1>`;
//       return element;
//     },
//   };
// });

// const form = new Form({
//   name: 'test',
//   fields: [
//     field.text('firstname', 'First Name').required()._,
//     field.text('lastname', 'Last Name').required().$,
//     field.number('age', 'Age').min(18).cfg,
//     field.telephone('phone', 'Phone #').required().c,
//     field.textarea('about', 'About You').max(10000).,
//   ],
// });
