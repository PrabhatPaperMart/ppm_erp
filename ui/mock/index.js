// mock/index.js
import user from './user';

export function setupProdMockServer() {
  return [...user];
}