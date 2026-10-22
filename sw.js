/* ClockInLockIn service worker: shows push notifications. It does not cache anything. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{}}catch(x){d={body:e.data?e.data.text():''}}
  const title=d.title||'ClockInLockIn';
  e.waitUntil(self.registration.showNotification(title,{body:d.body||'You have a new notification.',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||undefined,data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus' in c)return c.focus()}
    return self.clients.openWindow(url)}));
});
