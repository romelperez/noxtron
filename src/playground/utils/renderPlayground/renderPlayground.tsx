import React from 'react';
import { render } from 'react-dom';

import { Playground, PlaygroundProps } from '../../containers/Playground';

const renderPlayground = (
  getSettings: PlaygroundProps['getSettings'],
  element: HTMLElement
): void => {
  render(<Playground getSettings={getSettings} />, element);
};

export { renderPlayground };
