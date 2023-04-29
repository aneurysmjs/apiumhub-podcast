import { renderHook, act } from '@testing-library/react';
import usePrevious from './usePrevious';

describe('usePrevious', () => {
  it('returns the previous value of the input', () => {
    const { result, rerender } = renderHook((props) => usePrevious(props), {
      initialProps: 0, // Initial input value
    });

    expect(result.current).toBeUndefined(); // Initial previous value should be undefined

    act(() => {
      rerender(1); // Update input value
    });

    expect(result.current).toBe(0); // Previous value should be the initial input value (0)

    act(() => {
      rerender(2); // Update input value again
    });

    expect(result.current).toBe(1); // Previous value should be the previous input value (1)
  });

  it('works with non-prmitive values', () => {
    const objectValue = { prop: 'value' };
    const arrayValue = [1, 2, 3];
    const functionValue = () => 'value';

    const { result, rerender } = renderHook((props) => usePrevious(props), {
      initialProps: objectValue, // Initial input value
    });

    expect(result.current).toBeUndefined(); // Initial previous value should be undefined

    act(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - no a problem, it just took the same type from the beginning
      rerender(arrayValue); // Update input value
    });

    expect(result.current).toBe(objectValue); // Previous value should be the initial input value (objectValue)

    act(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - no a problem, it just took the same type from the beginning
      rerender(functionValue); // Update input value again
    });

    expect(result.current).toBe(arrayValue); // Previous value should be the previous input value (arrayValue)
  });
});
