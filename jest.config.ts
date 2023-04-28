import type { Config } from 'jest';
import path from 'node:path';
import fs from 'node:fs';

import baseConfig from './jest.base.config';

const resolveFullPath = (dir: string) => path.resolve(__dirname, dir);

type WorkspaceInfo = [string, string[]];

const WORKSPACES = ['apps', 'packages'];

const resolveWorkspaceDirs = (workspace: string) =>
  fs
    .readdirSync(workspace)
    .filter((name) => fs.lstatSync(path.join(workspace, name)).isDirectory());

const projectWorkspacesInfo = WORKSPACES.map((workspace) => [
  workspace,
  resolveWorkspaceDirs(resolveFullPath(workspace)),
]) as WorkspaceInfo[];

const makeJestProjects = (workspaceInfo: WorkspaceInfo) => {
  const [workspaceName, workspaces] = workspaceInfo;

  return workspaces.map((workspace) => ({
    ...baseConfig,
    displayName: workspace,
    testMatch: [
      `<rootDir>/${workspaceName}/${workspace}/**/?(*.)+(spec|test).[jt]s?(x)`,
      `<rootDir>/${workspaceName}/${workspace}/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}`,
    ],
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: `<rootDir>/${workspaceName}/${workspace}/tsconfig.json`,
        },
      ],
      '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    },

    moduleNameMapper: {
      '^@/(.+)': `<rootDir>/${workspaceName}/${workspace}/src/$1`,
    },
  }));
};

const projects = projectWorkspacesInfo.map(makeJestProjects).flat();

const config: Config = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore -> ts-jest's transform options types doesn't align with Jest's transform
  projects,
};

export default config;
