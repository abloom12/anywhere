import { fetchData } from '@/util/fetch';

const resp = await fetchData('getCustomTextAndAnywhereVersion', {});

function companyLogo() {
  // './images/custom-logo/customLogo.jpg'
}

if ("serviceWorker" in navigator) {
  await navigator.serviceWorker.register('./worker/sw.js', {
    scope: '/'
  })
}