import type { Config } from '../../types';

const getUserGlobalConfig = (): Config => {
  const win = window as any;
  const globalConfig: Partial<Config> = win.getNoxtronConfig
    ? win.getNoxtronConfig()
    : {};
  const config: Config = {
    playgroundPath: '/',
    sandboxPath: '/sandbox/',
    ...globalConfig,
    basePath: (globalConfig.basePath || '').replace(/\/$/, '') || '/'
  };
  return config;
};

export { getUserGlobalConfig };
