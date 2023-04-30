/* eslint-disable @typescript-eslint/no-unsafe-call */
import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import PodcastEpisode from './PodcastEpisode';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

// Mock the useAppSelector hook
jest.mock('@/store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

describe('podcastEpisode', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders podcast episode details when episodeId is valid', () => {
    // Mock useParams to return a valid episodeId
    (useParams as jest.Mock).mockReturnValue({ episodeId: '1' });

    // Mock useAppSelector to return a valid podcast description

    (useAppSelector as jest.Mock).mockReturnValue({
      trackName: 'Episode Title',
      description: 'Episode Description',
      episodeUrl: 'https://example.com/episode.mp3',
    });

    // Render the PodcastEpisode component
    const { getByText, queryByTestId } = render(<PodcastEpisode />);

    // Assert that the episode title, description, and audio player are rendered
    expect(getByText('Episode Title')).not.toBeNull();
    expect(getByText('Episode Description')).not.toBeNull();
    expect(queryByTestId('player')).not.toBeNull();
  });

  it('does not render podcast episode details when episodeId is invalid', () => {
    // Mock useParams to return an invalid episodeId
    (useParams as jest.Mock).mockReturnValue({ episodeId: null });

    // Mock useAppSelector to return null for podcast description
    (useAppSelector as jest.Mock).mockReturnValue(null);

    // Render the PodcastEpisode component
    const { queryByText, queryByTestId } = render(<PodcastEpisode />);

    // Assert that the episode title, description, and audio player are not rendered
    expect(queryByText('Episode Title')).toBeNull();
    expect(queryByText('Episode Description')).toBeNull();
    expect(queryByTestId('player')).toBeNull();
  });
});
