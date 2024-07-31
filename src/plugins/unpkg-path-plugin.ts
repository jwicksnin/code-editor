import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
        // Override esbuild's default resolve to find the path
        // of the index.js file 
        // Runs a second time where imports are
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        const { path, resolveDir } = args;
        if (path === 'index.js') {
            return { path, namespace: 'a' }
        // if the path is a relative path, create the correct url
        } else if (path.includes('./') || path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(path, `https://unpkg.com${resolveDir}/`).href
          }
        }
        return {
          namespace: 'a',
          path: `https://unpkg.com/${path}`
        }
        
      });
      // Override esbuild's default for reading the index.js directly
      // from the file system
      // Runs a second time to try to load the import file
      build.onLoad({ filter: /.*/ }, async (args: any) => {
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from 'react';
              console.log(message);
            `,
          };
        }

        const response = await fetch(args.path);
        const data = await response.text();
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', response.url).pathname
        };
      });
    },
  };
};
