import React, { ReactElement, ReactNode, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type {
  NTRouterURLOption,
  NTRouterState,
  NTRouterStateOptions,
  NTRouterStateSetOptionsUpdate
} from '../../../types';
import {
  NT_BREAKPOINTS,
  NT_ROUTER_URL_OPTIONS_BOOLEANS,
  NT_ROUTER_URL_OPTIONS
} from '../../../constants';
import { convertLocationSearchToString } from '../../../utils/convertLocationSearchToString';
import { convertLocationSearchToObject } from '../../../utils/convertLocationSearchToObject';
import { encodeURLParameter } from '../../../utils/encodeURLParameter';
import { decodeURLParameter } from '../../../utils/decodeURLParameter';

import { useMediaQuery } from '../../utils/useMediaQuery';
import { RouterStateContext } from '../../utils/RouterStateContext';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';

interface RouterStateProviderProps {
  children: ReactNode;
}

const getLocationOptions = (): NTRouterStateOptions => {
  const optionsRaw: Record<string, string | undefined> =
    convertLocationSearchToObject(window.location.search);

  const options: NTRouterState['options'] = Object.keys(optionsRaw)
    .filter((key) => (NT_ROUTER_URL_OPTIONS as string[]).includes(key))
    .map((key) => ({ [key]: optionsRaw[key] || '' }))
    .reduce(
      (all, item) => ({ ...all, ...item }),
      {}
    ) as NTRouterState['options'];

  return options;
};

const RouterStateProvider = (props: RouterStateProviderProps): ReactElement => {
  const { children } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const settings = usePlaygroundSettings();
  const isMQMediumUp = useMediaQuery(NT_BREAKPOINTS.medium.up);

  const routerState = useMemo(() => {
    const options = getLocationOptions();

    const optionsControls: NTRouterState['optionsControls'] = {
      type: options.type === 'predefined' ? 'predefined' : 'custom',
      sandbox: (options.sandbox || '').split('|').filter(Boolean),
      code: decodeURLParameter(options.code || '')
    };

    const optionsBooleans: NTRouterState['optionsBooleans'] = Object.keys(
      options
    )
      .filter((key) =>
        (NT_ROUTER_URL_OPTIONS_BOOLEANS as string[]).includes(key)
      )
      .map((key) => ({
        [key]: options[key as keyof typeof options]?.toLowerCase() === 'true'
      }))
      .reduce(
        (all, item) => ({ ...all, ...item }),
        {}
      ) as NTRouterState['optionsBooleans'];

    if (options.editor === undefined) {
      optionsBooleans.editor = isMQMediumUp;
    }

    if (options.preview === undefined) {
      optionsBooleans.preview = isMQMediumUp;
    }

    if (options.dark === undefined) {
      optionsBooleans.dark =
        (settings.theme?.colorSchemeDefault ?? 'dark') === 'dark';
    }

    if (
      options.explorer === undefined ||
      (!optionsBooleans.editor && !optionsBooleans.preview)
    ) {
      optionsBooleans.explorer = true;
    }

    const setOptions: NTRouterState['setOptions'] = (optionsToUpdate) => {
      if (optionsToUpdate.type === 'predefined') {
        optionsToUpdate.code = '';
      } else if (optionsToUpdate.type === 'custom') {
        optionsToUpdate.sandbox = [];
      }

      if (optionsToUpdate.explorer !== undefined) {
        if (!isMQMediumUp && optionsToUpdate.explorer) {
          optionsToUpdate.editor = false;
          optionsToUpdate.preview = false;
        }
      } else if (optionsToUpdate.editor !== undefined) {
        if (!optionsToUpdate.editor) {
          optionsToUpdate.preview = true;
        }
        if (!isMQMediumUp && optionsToUpdate.editor) {
          optionsToUpdate.explorer = false;
          optionsToUpdate.preview = false;
        }
      } else if (optionsToUpdate.preview !== undefined) {
        if (!optionsToUpdate.preview) {
          optionsToUpdate.editor = true;
        }
        if (!isMQMediumUp && optionsToUpdate.preview) {
          optionsToUpdate.explorer = false;
          optionsToUpdate.editor = false;
        }
      }

      const currentOptions = getLocationOptions();

      const newOptions = {
        ...currentOptions,
        ...Object.keys(optionsToUpdate)
          .map((name) => {
            const rawValue = optionsToUpdate[name as NTRouterURLOption];
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
      };

      if (!newOptions.type) {
        newOptions.type = 'custom';
      }

      // Always show at least the explorer panel.
      if (
        newOptions.explorer === 'false' &&
        newOptions.editor === 'false' &&
        newOptions.preview === 'false'
      ) {
        newOptions.explorer = 'true';
      }

      const newLocationSearch = convertLocationSearchToString(newOptions);

      navigate(`${location.pathname}?${newLocationSearch}`);
    };

    const routerState: NTRouterState = Object.freeze({
      options,
      optionsControls,
      optionsBooleans,
      setOptions: (optionsToUpdate: NTRouterStateSetOptionsUpdate): void => {
        // If simultaneous calls are made, wait until "window.location" is updated.
        setTimeout(() => setOptions(optionsToUpdate), 0);
      }
    });

    return routerState;
  }, [location, isMQMediumUp]);

  useEffect(() => {
    settings.onRouteChange?.();
  }, [settings.onRouteChange, location]);

  return (
    <RouterStateContext.Provider value={routerState}>
      {children}
    </RouterStateContext.Provider>
  );
};

export type { RouterStateProviderProps };
export { RouterStateProvider };
