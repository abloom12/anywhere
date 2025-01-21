import './style.css';
import { Calendar } from './calendar';

const myCal = Calendar.init();

const appContainer = document.getElementById('app');

appContainer?.appendChild(myCal);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register(
//     import.meta.env.MODE === 'production' ?
//       '/sw.js'
//     : '/dev-sw.js?dev-sw',
//   );
// }
