# Typescript Code Editor Project
## Technologies
* React
* Typescript
* ESBuild
* Vite
* IndexedDB

## Notes
### Offline Browser Storage: IndexedDB vs CacheAPI
* Both have unlimitied storage (vs localStorage)
* Needing to cache HTML, JS, assets? Use a CDN instead of offline storage
* Cache API is tied to network requests, which at first glance made it better 
for this project. However, because what is actually returned is a new object
with the response as a property, we're not able to take advantage of `cache.add`, which 
would both conditionally make the request and add it to the cache, leading to more code
than using IndexedDB.
* The Type required for Cache API is `Response`, so we can't make this simpler by putting
the new object in the cache; instead, we must cache the network response.
* Using a library like `localForage` (or `IDB`) abstracts a lot of the complexity of implementing
IndexedDB and provides Promises as well.
* See [`unpkgPathPlugin`](src/plugins/unpkg-path-plugin.ts) for usage.
