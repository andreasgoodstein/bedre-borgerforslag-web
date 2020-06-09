export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('./service-worker.js');
  }
};

export const registerMessageListener = (messageHandler) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', messageHandler);
  }
};
