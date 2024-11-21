import './style.css';

if ("serviceWorker" in navigator) {
  await navigator.serviceWorker.register('./sw.js', {
    scope: '/'
  })
}

