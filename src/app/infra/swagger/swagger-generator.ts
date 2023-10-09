import path from 'path';

import { SwaggerConfig, generateDocumentation } from 'typescript-swagger';

export const swaggerConfig: SwaggerConfig = {
  yaml: true,
  name: 'API - Documentation',
  basePath: '/',
  version: '1.0',
  outputDirectory: 'public',
  entryFile: path.join('..', '..', 'modules', '**', '*.controller.ts'),
  decoratorConfig: {
    useBuildIn: true,
    useLibrary: ['typescript-rest', '@decorators/express'],
  },
  ignore: ['**/node_modules/**'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

export async function generateSwaggerDocumentation(): Promise<void> {
  await generateDocumentation(swaggerConfig, {
    esModuleInterop: true,
    declaration: true,
    removeComments: true,
    resolveJsonModule: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    allowSyntheticDefaultImports: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    noImplicitAny: true,
    sourceMap: true,
    rootDir: './',
    outDir: '../dist',
    baseUrl: './',
    lib: ['es6'],
    incremental: true,
    strict: true,
    importHelpers: true,
    types: ['reflect-metadata'],
    typeRoots: ['src/types', 'node_modules/@types'],
    paths: {
      '@/app/*': ['app/*'],
      '@/libs/*': ['libs/*'],
    },
  });
}
