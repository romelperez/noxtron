import type { Config } from '../../types';

const getUserGlobalConfig = (): Config => {
  const globalConfig: Partial<Config> = (window as any).noxtronConfig || {};
  const config: Config = {
    playgroundPath: '/',
    sandboxPath: '/sandbox/',
    ...globalConfig,
    basePath: (globalConfig.basePath || '').replace(/\/$/, '') || '/',
  };
  return config;
};

export { getUserGlobalConfig };
