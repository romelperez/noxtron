import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { RouterURLOption, RouterState } from '../../types';
import {
  ROUTER_URL_OPTIONS_BOOLEANS,
  ROUTER_URL_OPTIONS
} from '../../constants';
import { convertLocationSearchToString } from '../convertLocationSearchToString';
import { convertLocationSearchToObject } from '../convertLocationSearchToObject';
import { encodeSourceCode } from '../encodeSourceCode';
import { decodeSourceCode } from '../decodeSourceCode';

// TODO: Prevent user from hiding all panels.

const useRouterState = (): RouterState => {
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(() => {
    const locationOptions: Record<string, string | undefined> =
      convertLocationSearchToObject(location.search);

    const options: RouterState['options'] = Object.keys(locationOptions)
      .filter((key) => (ROUTER_URL_OPTIONS as string[]).includes(key))
      .map((key) => ({ [key]: locationOptions[key] || '' }))
      .reduce(
        (all, item) => ({ ...all, ...item }),
        {}
      ) as RouterState['options'];

    const optionsControls: RouterState['optionsControls'] = {
      type: options.type === 'predefined' ? 'predefined' : 'custom',
      sandbox: (options.sandbox || '').split('|').filter(Boolean),
      code: decodeSourceCode(options.code || '')
    };

    if (!options.type) {
      options.type = optionsControls.type;
    }

    const optionsBooleans: RouterState['optionsBooleans'] = Object.keys(
      locationOptions
    )
      .filter((key) => (ROUTER_URL_OPTIONS_BOOLEANS as string[]).includes(key))
      .map((key) => ({ [key]: locationOptions[key]?.toLowerCase() === 'true' }))
      .reduce(
        (all, item) => ({ ...all, ...item }),
        {}
      ) as RouterState['optionsBooleans'];

    const setOptions: RouterState['setOptions'] = (newOptions) => {
      if (newOptions.type === 'predefined') {
        newOptions.code = '';
      } else if (newOptions.type === 'custom') {
        newOptions.sandbox = [];
      }

      const newLocationSearch = convertLocationSearchToString({
        ...options,
        ...Object.keys(newOptions)
          .map((name) => {
            const rawValue = newOptions[name as RouterURLOption];
            let value = '';

            switch (name) {
              case 'sandbox': {
                const valueList = rawValue as
                  | RouterState['optionsControls']['sandbox']
                  | undefined;
                value = valueList ? valueList.filter(Boolean).join('|') : '';
                break;
              }
              case 'code': {
                value = encodeSourceCode(
                  (rawValue as RouterState['options']['code']) || ''
                );
                break;
              }
              default: {
                value = String(rawValue ?? '');
                break;
              }
            }

            return { [name]: value };
          })
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
