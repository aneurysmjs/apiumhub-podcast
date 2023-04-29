import axios from 'axios';
import { expect, it, jest } from '@jest/globals';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';

import renderWithRedux from '@/store/helpers/renderWithRedux';
import podcastMockData from '@/services/podcastMockData';
import Home from './Home';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Home', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render podcast list', async () => {
    mockAxios.get.mockResolvedValue(podcastMockData);

    renderWithRedux(<Home />);

    await waitFor(() => {
      const podcastItems = screen.getAllByTestId('podcast-item');
      expect(podcastItems).toHaveLength(3);
    });
  });

  it('should filter the podcast list when user types in the search input', async () => {
    mockAxios.get.mockResolvedValue(podcastMockData);

    renderWithRedux(<Home />);

    await waitFor(() => {
      const podcastItems = screen.getAllByTestId('podcast-item');
      expect(podcastItems).toHaveLength(3);
    });

    const input = screen.getByTestId('input-search');
    expect(input).toBeDefined();

    fireEvent.change(input, { target: { value: 'T' } });
    fireEvent.change(input, { target: { value: 'Th' } });
    fireEvent.change(input, { target: { value: 'The' } });
    fireEvent.change(input, { target: { value: 'The J' } });
    fireEvent.change(input, { target: { value: 'The Jo' } });
    fireEvent.change(input, { target: { value: 'The Joe' } });

    expect((input as HTMLInputElement).value).toBe('The Joe');

    // here we fullfill useDebounce's timer so value can be reflected on component's state
    act(() => {
      jest.runAllTimers();
    });

    const podcastItems = screen.getAllByTestId('podcast-item');

    expect(podcastItems).toHaveLength(1);
  });

  it('should display "no results" text when filtering wrong', async () => {
    mockAxios.get.mockResolvedValue(podcastMockData);

    renderWithRedux(<Home />);

    await waitFor(() => {
      const podcastItems = screen.getAllByTestId('podcast-item');
      expect(podcastItems).toHaveLength(3);
    });

    const input = screen.getByTestId('input-search');
    expect(input).toBeDefined();

    fireEvent.change(input, { target: { value: 'q' } });
    fireEvent.change(input, { target: { value: 'qw' } });
    fireEvent.change(input, { target: { value: 'qwe' } });
    fireEvent.change(input, { target: { value: 'qwer' } });
    fireEvent.change(input, { target: { value: 'qwert' } });
    fireEvent.change(input, { target: { value: 'qwerty' } });

    expect((input as HTMLInputElement).value).toBe('qwerty');

    act(() => {
      jest.runAllTimers();
    });

    const podcastItems = screen.queryAllByTestId('podcast-item');

    expect(podcastItems).toHaveLength(0);

    const noResults = screen.getByTestId('no-results');
    expect(noResults).toBeDefined();
  });
});
