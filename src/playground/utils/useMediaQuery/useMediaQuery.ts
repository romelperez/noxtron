import { useEffect, useState } from 'react';

const useMediaQuery = (mediaQuery: string): boolean => {
  const [active, setActive] = useState(() => {
    return window.matchMedia(mediaQuery.replace(/^@media /, '')).matches;
  });

  useEffect(() => {
    const mediaQueryMatch = mediaQuery.replace(/^@media /, '');
    const mediaQueryList = window.matchMedia(mediaQueryMatch);

    const onChange = (): void => {
      setActive(mediaQueryList.matches);
    };
    mediaQueryList.addEventListener('change', onChange);

    return () => {
      mediaQueryList.removeEventListener('change', onChange);
    };
  }, [mediaQuery]);

  return active;
};

export { useMediaQuery };
