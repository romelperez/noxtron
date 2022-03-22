import { useLocation, useNavigate } from 'react-router-dom';

import type { RouterURLOption, RouterState } from '@src/types';
import { ROUTER_URL_OPTIONS_BOOLEANS, ROUTER_URL_OPTIONS } from '@src/constants';
import { convertLocationSearchToString } from '../convertLocationSearchToString';
import { convertLocationSearchToObject } from '../convertLocationSearchToObject';
import { useMemo } from 'react';

const useRouterState = (): RouterState => {
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(() => {
    const locationOptions: Record<string, string | undefined> = convertLocationSearchToObject(location.search);

    const options: RouterState['options'] = Object
      .keys(locationOptions)
      .filter(key => (ROUTER_URL_OPTIONS as string[]).includes(key))
      .map(key => ({ [key]: locationOptions[key] || '' }))
      .reduce((all, item) => ({ ...all, ...item }), {}) as RouterState['options'];

    const optionsControls: RouterState['optionsControls'] = {
      type: options.type === 'predefined' ? 'predefined' : 'custom',
      sandbox: (options.sandbox || '').split('|')
    };

    if (!options.type) {
      options.type = optionsControls.type;
    }

    const optionsBooleans: RouterState['optionsBooleans'] = Object
      .keys(locationOptions)
      .filter(key => (ROUTER_URL_OPTIONS_BOOLEANS as string[]).includes(key))
      .map(key => ({ [key]: locationOptions[key]?.toLowerCase() === 'true' }))
      .reduce((all, item) => ({ ...all, ...item }), {}) as RouterState['optionsBooleans'];

    const setOptions: RouterState['setOptions'] = newOptions => {
      const newLocationSearch = convertLocationSearchToString({
        ...options,
        ...Object
          .keys(newOptions)
          .map(name => ({ [name]: String(newOptions[name as RouterURLOption] ?? '') }))
          .reduce((all, item) => ({ ...all, ...item }), {})
      });

      navigate(`${location.pathname}?${newLocationSearch}`);
    };

    const routerState: RouterState = Object.freeze({
      options,
      optionsControls,
      optionsBooleans,
      setOptions
    });

    return routerState;
  }, [location]);
};

export { useRouterState };
