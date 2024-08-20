# Typescript Code Editor Project
Building a browser-based code editor

Using Typescript, ESBuild, React, Vite, IndexedDB

Based on the [Udemy course](https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project)

## Things I Discovered
### Offline Browser Storage: IndexedDB vs CacheAPI
*See the [cacheAPI solution version here](https://github.com/jwicksnin/code-editor/tree/cacheAPI-solution)*
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

### Setting Up Tests: Jest, Testing Library, Typescript, Babel
At first I was really ambitious and tried to set up tests that would use all these technologies
*and* render the `App` component with its associated esbuild library. That did not work, despite
the dozens of tabs I had open for research. So I scaled back...
* I started with Jest and a basic test from their documentation. That passed with flying colors.
* Then I ran into an issue with Jest and Typescript the Testing Library. Basically Typescript wasn't finding the matchers for Jest globals (i.e. `toHaveTextContent`). I was not the first one to run into this issue. 
* I tried a couple different approaches, including updating VSCode to use the same version of Typescript as this project. To solve it, I augmented the jest globals module in a `declarations.d.ts` file. This [solution](./declarations.d.ts) came straight from a [github issue](https://github.com/testing-library/jest-dom/issues/426#issuecomment-1140362826).
* Next, I ran into another very common issue: when I ran the tests using a dummy `.tsx` component, I got an error `Cannot use JSX unless the '--jsx' flag is provided`. I tried to stay away from brute forcing random config variables and eventually removed `ts-jest` and replaced it in the `jest.config.js` with `babel-jest`. I was using `ts-jest` according to the Jest documentation, but decided that getting the tests running was a higher priority. 
