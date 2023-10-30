const publicVapidKey = ""

if ('serviceWorker' in navigator) {
  registerServiceWorker().catch(console.log)
}

async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/'
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

async function unsubscribePush() {
  const reg = await navigator.serviceWorker.getRegistration();
  const subscription = await reg.pushManager.getSubscription();

  if (subscription) {
    await subscription.unsubscribe();
    await fetch("/unsubscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
  else {
    // already subscribed
  }
}