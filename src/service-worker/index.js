export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('./service-worker.js');
  }
};
