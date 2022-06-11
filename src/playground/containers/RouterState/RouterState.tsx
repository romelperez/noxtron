import React, { ReactElement, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from 'effector-react';

import type {
  NTRouterURLOption,
  NTStoreRouter,
  NTRouterOptions
} from '../../../types';
import {
  NT_BREAKPOINTS,
  NT_ROUTER_URL_OPTIONS_BOOLEANS,
  NT_ROUTER_URL_OPTIONS
} from '../../../constants';
import {
  convertLocationSearchToString,
  convertLocationSearchToObject,
  encodeURLParameter,
  decodeURLParameter
} from '../../../utils';
import { useMediaQuery } from '../../utils';
import { $setup, $router, sendRouterState, sendRoute } from '../../services';

const getLocationOptions = (): NTRouterOptions => {
  const optionsRaw: Record<string, string | undefined> =
    convertLocationSearchToObject(window.location.search);

  const options: NTStoreRouter['options'] = Object.keys(optionsRaw)
    .filter((key) => (NT_ROUTER_URL_OPTIONS as string[]).includes(key))
    .map((key) => ({ [key]: optionsRaw[key] || '' }))
    .reduce(
      (all, item) => ({ ...all, ...item }),
      {}
    ) as NTStoreRouter['options'];

  return options;
};

const RouterState = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const setup = useStore($setup);
  const isMQMediumUp = useMediaQuery(NT_BREAKPOINTS.medium.up);
  const router = useStore($router);

  useEffect(() => {
    const options = getLocationOptions();

    const optionsControls: NTStoreRouter['optionsControls'] = {
      type: options.type === 'predefined' ? 'predefined' : 'custom',
      sandbox: (options.sandbox || '').split('|').filter(Boolean),
      code: decodeURLParameter(options.code || '')
    };

    const optionsBooleans: NTStoreRouter['optionsBooleans'] = Object.keys(
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
      ) as NTStoreRouter['optionsBooleans'];

    if (options.editor === undefined) {
      optionsBooleans.editor = isMQMediumUp;
    }

    if (options.preview === undefined) {
      optionsBooleans.preview = isMQMediumUp;
    }

    if (options.dark === undefined || setup.theme.colorSchemeDisabled) {
      const colorSchemeDefault = setup.theme.colorSchemeDefault ?? 'dark';
      optionsBooleans.dark = colorSchemeDefault === 'dark';
    }

    // Always show at least the explorer panel.
    if (
      options.explorer === undefined ||
      (!optionsBooleans.editor && !optionsBooleans.preview)
    ) {
      optionsBooleans.explorer = true;
    }

    sendRouterState({
      options,
      optionsControls,
      optionsBooleans
    });
  }, [location, isMQMediumUp]);

  useEffect(() => {
    return sendRoute.watch((providedOptions) => {
      const options = { ...providedOptions };

      if (options.type === 'predefined') {
        options.code = '';
      } else if (options.type === 'custom') {
        options.sandbox = [];
      }

      if (options.explorer !== undefined) {
        if (!isMQMediumUp && options.explorer) {
          options.editor = false;
          options.preview = false;
        }
      } else if (options.editor !== undefined) {
        if (!options.editor) {
          options.preview = true;
        }
        if (!isMQMediumUp && options.editor) {
          options.explorer = false;
          options.preview = false;
        }
      } else if (options.preview !== undefined) {
        if (!options.preview) {
          options.editor = true;
        }
        if (!isMQMediumUp && options.preview) {
          options.explorer = false;
          options.editor = false;
        }
      }

      const currentOptions = getLocationOptions();

      const newOptions = {
        ...currentOptions,
        ...Object.keys(options)
          .map((name) => {
            const rawValue = options[name as NTRouterURLOption];
            let value = '';

            switch (name) {
              case 'sandbox': {
                const valueList = rawValue as
                  | NTStoreRouter['optionsControls']['sandbox']
                  | undefined;
                value = valueList ? valueList.filter(Boolean).join('|') : '';
                break;
              }
              case 'code': {
                value = encodeURLParameter(
                  (rawValue as NTStoreRouter['options']['code']) || ''
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

      const newLocationSearch = convertLocationSearchToString(newOptions);

      navigate(`${location.pathname}?${newLocationSearch}`);
    });
  }, [router]);

  useEffect(() => {
    setup.onRouteChange?.();
  }, [setup.onRouteChange, location]);

  return <></>;
};

export { RouterState };
