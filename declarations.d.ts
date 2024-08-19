import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
// from https://github.com/testing-library/jest-dom/issues/426#issuecomment-1140362826
declare module '@jest/globals/node_modules/expect/build/types' {
  export interface Matchers<R = void, T = unknown>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
