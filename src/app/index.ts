import 'reflect-metadata';
import { Container } from 'typedi';

import { App } from './app';

try {
  const app = Container.get(App);
  app.start().catch(handleError);
} catch (e) {
  handleError(e);
}

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: unknown) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
function handleError(e: unknown) {
  console.log(e);
  process.exit(1);
}
