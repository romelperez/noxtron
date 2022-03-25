import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { NTRouterURLOption, NTRouterState } from '../../../types';
import {
  NT_ROUTER_URL_OPTIONS_BOOLEANS,
  NT_ROUTER_URL_OPTIONS
} from '../../../constants';
import { convertLocationSearchToString } from '../../../utils/convertLocationSearchToString';
import { convertLocationSearchToObject } from '../../../utils/convertLocationSearchToObject';
import { encodeURLParameter } from '../../../utils/encodeURLParameter';
import { decodeURLParameter } from '../../../utils/decodeURLParameter';

// TODO: Prevent user from hiding all panels.

const useRouterState = (): NTRouterState => {
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(() => {
    const locationOptions: Record<string, string | undefined> =
      convertLocationSearchToObject(location.search);

    const options: NTRouterState['options'] = Object.keys(locationOptions)
      .filter((key) => (NT_ROUTER_URL_OPTIONS as string[]).includes(key))
      .map((key) => ({ [key]: locationOptions[key] || '' }))
      .reduce(
        (all, item) => ({ ...all, ...item }),
        {}
      ) as NTRouterState['options'];

    const optionsControls: NTRouterState['optionsControls'] = {
      type: options.type === 'predefined' ? 'predefined' : 'custom',
      sandbox: (options.sandbox || '').split('|').filter(Boolean),
      code: decodeURLParameter(options.code || '')
    };

    if (!options.type) {
      options.type = optionsControls.type;
    }

    const optionsBooleans: NTRouterState['optionsBooleans'] = Object.keys(
      locationOptions
    )
      .filter((key) =>
        (NT_ROUTER_URL_OPTIONS_BOOLEANS as string[]).includes(key)
      )
      .map((key) => ({ [key]: locationOptions[key]?.toLowerCase() === 'true' }))
      .reduce(
        (all, item) => ({ ...all, ...item }),
        {}
      ) as NTRouterState['optionsBooleans'];

    const setOptions: NTRouterState['setOptions'] = (newOptions) => {
      if (newOptions.type === 'predefined') {
        newOptions.code = '';
      } else if (newOptions.type === 'custom') {
        newOptions.sandbox = [];
      }

      const newLocationSearch = convertLocationSearchToString({
        ...options,
        ...Object.keys(newOptions)
          .map((name) => {
            const rawValue = newOptions[name as NTRouterURLOption];
            let value = '';

            switch (name) {
              case 'sandbox': {
                const valueList = rawValue as
                  | NTRouterState['optionsControls']['sandbox']
                  | undefined;
                value = valueList ? valueList.filter(Boolean).join('|') : '';
                break;
              }
              case 'code': {
                value = encodeURLParameter(
                  (rawValue as NTRouterState['options']['code']) || ''
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

    const routerState: NTRouterState = Object.freeze({
      options,
      optionsControls,
      optionsBooleans,
      setOptions
    });

    return routerState;
  }, [location]);
};

export { useRouterState };
