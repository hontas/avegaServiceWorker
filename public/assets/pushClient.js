const push = (function() {
  const applicationServerPublicKey = 'BE7ZkeqVSxbtZVBqRiKRHrHmZE5wVPr4SJ_U-dMIiOSkcVNEPTNcBsVogHrQ8BvRHF-FR8KO8kdnyCVAMo69Ar0';

  function subscribe(reg) {
    reg.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) return subscription;
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
        })
      })
      .then((sub) => {
        const key = btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh'))));
        const auth = btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth'))));
        const endpoint = sub.endpoint;
        console.log(sub)
        console.log('p256dh', key);
        console.log('auth', auth);
        console.log('endpoint', endpoint);
        return registerPush({ endpoint, key, auth });
      })
      .then(() => Notification.requestPermission())
      .then(() => console.log('subscribed and allowed'))
      .catch((err) => console.log('subscription failed', err));
  }

  function registerPush(options) {
    fetch('/push/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(options),
    });
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return {
    subscribe
  };
}())
