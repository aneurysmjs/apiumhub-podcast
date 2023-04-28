import { FunctionComponent, useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import useClickOutside from './useClickOutside';

interface Props {
  onClick: () => void;
}

const ClickOutside: FunctionComponent<Props> = ({ onClick }) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  useClickOutside(ref, onClick);

  return <button ref={ref}>Click me</button>;
};

/**
 * @see https://webman.pro/blog/how-to-detect-and-test-click-outside-in-react/
 */
describe('useClickOutside', () => {
  it('should call onClick() when clicking outside', () => {
    const onClick = jest.fn();
    render(<ClickOutside onClick={onClick} />);

    fireEvent.mouseDown(document.body);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should NOT call onClick() when clicking inside', () => {
    const onClick = jest.fn();
    render(<ClickOutside onClick={onClick} />);

    fireEvent.mouseDown(screen.getByText('Click me'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
