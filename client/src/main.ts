import './style.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ?
      '/sw.js'
    : '/dev-sw.js?dev-sw',
  );
}
