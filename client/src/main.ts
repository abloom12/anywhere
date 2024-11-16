import './style.css';

import { Input, Input2 } from './components/Form/Input';

function benchmark(func: () => {}, iterations: number): string {
  const t0 = performance.now();

  for (let i = 0; i < iterations; i++) {
    func();
  }

  const t1 = performance.now();

  return `${(t1 - t0).toFixed(2)}ms`;
}

// document.addEventListener('click', () => {
//   console.log(
//     benchmark(() => {
//       return true;
//     }, 1000),
//   );
// });
