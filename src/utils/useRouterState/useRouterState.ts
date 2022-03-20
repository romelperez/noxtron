import { useTheme } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { RouterState } from '@src/types';
import { ROUTER_URL_OPTIONS_BOOLEANS, ROUTER_URL_OPTIONS } from '@src/constants';
import { convertLocationSearchToString } from '../convertLocationSearchToString';
import { convertLocationSearchToObject } from '../convertLocationSearchToObject';
import { useMemo } from 'react';

const useRouterState = (): RouterState => {
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(() => {
    const locationPath = location.pathname.split('/').slice(1); // Remove "/play" in path.
    const locationOptions: Record<string, string | undefined> = convertLocationSearchToObject(location.search);

    const [locationType, ...route] = locationPath;
    const type = (locationType as RouterState['type']) === 'p' ? 'p' : 'c';

    const options: RouterState['options'] = Object
      .keys(locationOptions)
      .filter(key => (ROUTER_URL_OPTIONS as string[]).includes(key))
      .map(key => ({ [key]: locationOptions[key] }))
      .reduce((all, item) => ({ ...all, ...item }), {}) as RouterState['options'];

    const optionsBooleans: RouterState['optionsBooleans'] = Object
      .keys(locationOptions)
      .filter(key => (ROUTER_URL_OPTIONS_BOOLEANS as string[]).includes(key))
      .map(key => ({ [key]: locationOptions[key]?.toLowerCase() === 'true' }))
      .reduce((all, item) => ({ ...all, ...item }), {}) as RouterState['optionsBooleans'];

    // TODO: Implement default values.

    const currentLocationSearch = convertLocationSearchToString(locationOptions);
    const isReady = `${location.pathname}${location.search}` === `${location.pathname}?${currentLocationSearch}`;

    const setOptionValue: RouterState['setOptionValue'] = (option, value) => {
      const newLocationSearch = convertLocationSearchToString({
        ...options,
        [option]: value
      });

      navigate(`${location.pathname}?${newLocationSearch}`);
    };

    const routerState: RouterState = Object.freeze({
      isReady,
      type,
      route,
      options,
      optionsBooleans,
      setOptionValue
    });

    return routerState;
  }, [location]);
};

export { useRouterState };
