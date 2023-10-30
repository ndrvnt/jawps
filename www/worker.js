self.addEventListener('push', function (e) {
  const data = e.data.json();
  self.dove = data.url;
  self.registration.showNotification(
    data.title,
    {
      body: data.url,
      icon: "/logo.png" //icona della notifica
    }
  );
})

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  clients.openWindow(self.dove);
});