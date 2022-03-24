import type { NTConfig } from '../../types';

const getUserGlobalConfig = (): NTConfig => {
  const win = window as any;
  const globalConfig: Partial<NTConfig> = win.getNoxtronConfig
    ? win.getNoxtronConfig()
    : {};
  const config: NTConfig = {
    playgroundPath: '/',
    sandboxPath: '/sandbox/',
    ...globalConfig,
    basePath: (globalConfig.basePath || '').replace(/\/$/, '') || '/'
  };
  return config;
};

export { getUserGlobalConfig };
