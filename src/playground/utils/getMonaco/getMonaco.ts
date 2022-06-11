import { NTMonaco, NTSetup } from '../../../types';

const getMonaco = (setup: NTSetup): Promise<NTMonaco> => {
  const { assetsPath } = setup;

  const getMonacoJS = () => {
    return new Promise((resolve, reject) => {
      const element = document.createElement('script');
      element.onload = resolve;
      element.onerror = element.onabort = reject;
      element.src = assetsPath + 'monaco.js';
      document.body.appendChild(element);
    });
  };

  const getMonacoCSS = () => {
    return new Promise((resolve, reject) => {
      const element = document.createElement('link');
      element.onload = resolve;
      element.onerror = element.onabort = reject;
      element.rel = 'stylesheet';
      element.href = assetsPath + 'monaco.css';
      document.body.appendChild(element);
    });
  };

  return Promise.all([getMonacoJS(), getMonacoCSS()]).then(() => {
    return (window as any).noxtron.monaco as NTMonaco;
  });
};

export { getMonaco };
