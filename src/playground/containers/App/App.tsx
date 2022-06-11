import React, { ReactElement } from 'react';
import { useStore } from 'effector-react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { useMediaQuery } from '../../utils';
import { $dependencies, $router } from '../../stores';
import { MainLayout, Loading, StatusMessage } from '../../ui';

import { Header } from '../Header';
import { Explorer } from '../Explorer';
import { Toolbar } from '../Toolbar';
import { Editor } from '../Editor';
import { Preview } from '../Preview';
import { Links } from '../Links';

interface AppStatusProps {
  isLoading: boolean;
  error: string;
}

const AppStatus = (props: AppStatusProps): ReactElement => {
  if (props.isLoading) {
    return <Loading />;
  }
  if (props.error) {
    return <StatusMessage>{props.error}</StatusMessage>;
  }
  return <></>;
};

const App = (): ReactElement => {
  const isMQMediumUp = useMediaQuery(breakpoints.medium.up);

  const router = useStore($router);
  const dependencies = useStore($dependencies);

  const { optionsBooleans } = router;
  const { isLoading, error } = dependencies;
  const isReady = !isLoading && !error;

  return (
    <MainLayout
      header={<Header />}
      main={<AppStatus isLoading={isLoading} error={error} />}
      leftView={isReady && optionsBooleans.explorer && <Explorer />}
      workspaceHeader={isReady && <Toolbar />}
      panels={[
        isReady && optionsBooleans.editor && <Editor />,
        isReady && optionsBooleans.preview && <Preview />
      ].filter(Boolean)}
      footer={(isMQMediumUp || optionsBooleans.explorer) && <Links />}
    />
  );
};

export { App };
