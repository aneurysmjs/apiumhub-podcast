import { render, fireEvent } from '@testing-library/react';

import Switch from './Switch';

describe('Switch', () => {
  it('should call "clickOutsideSpy" when element is clicked ouside', () => {
    let isOn = false;

    const toggleSpy = jest.fn(() => {
      isOn = !isOn;
    });

    const { getByTestId, rerender } = render(<Switch toggle={toggleSpy} isOn={isOn} />);

    const button = getByTestId('toggle');

    fireEvent.click(button);

    rerender(<Switch toggle={toggleSpy} isOn={isOn} />);

    expect(isOn).toBe(true);
    expect(button.classList).toContain('switch--on');
    expect(button.classList).toContain('switch--on');

    fireEvent.click(button);

    rerender(<Switch toggle={toggleSpy} isOn={isOn} />);

    expect(isOn).toBe(false);
    expect(button.classList).toContain('switch--off');
    expect(button.classList).toContain('switch--off');
  });
});
