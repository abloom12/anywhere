import './style.css';

import { cn } from './core/cn';
import { html, withRefs } from './core/html';

const type = 'text';
const name = 'username';
const label = 'User Name';
const id = '1234';

const div = document.createElement('div');

const { ele, refs } = withRefs(
  html` <div class="${cn('text-black')}">
    <label
      ref="mylabel"
      for="${id}"
      >${label}</label
    >
    <input
      ref="myinput"
      type="${type}"
      name="${name}"
      id="${id}"
    />
    ${div}
  </div>`,
);

refs.mydiv;

document.body.appendChild(ele);
