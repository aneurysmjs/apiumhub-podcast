import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default function withUserSetup<T extends ReactElement>(jsx: T) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}
