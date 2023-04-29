import { generateApiActions } from '@apiumhub/utils';

export const [GET_PODCAST_REQUEST, GET_PODCAST_SUCCESS, GET_PODCAST_FAILURE] = generateApiActions(
  'podcast',
  'GET',
);

export const [
  GET_PODCAST_DESCRIPTION_REQUEST,
  GET_PODCAST_DESCRIPTION_SUCCESS,
  GET_PODCAST_DESCRIPTION_FAILURE,
] = generateApiActions('podcastDescription', 'GET');

export interface Label {
  label: string;
}

export interface Attributes<T> {
  attributes: {
    [K in keyof T]: T[K];
  };
}

export interface Entity<T> extends Label, Attributes<T> {}

interface ImImageAttributes {
  height: string;
}

interface ImPriceAttributes {
  amount: string;
  currency: string;
}

interface ImContentTypeAttributes extends Label {
  term: string;
}

interface LinkAttributes {
  href: string;
  rel: string;
  type: string;
}

interface IdAttributes {
  'im:id': string;
}

interface ImArtistAttributes {
  href: string;
}

interface CategoryAttributes extends Label {
  'im:id': string;
  term: string;
  scheme: string;
}

export interface Podcast {
  'im:artist': Entity<ImArtistAttributes>;
  'im:contentType': Entity<ImContentTypeAttributes>;
  'im:image': Entity<ImImageAttributes>[];
  'im:name': Label;
  'im:price': Entity<ImPriceAttributes>;
  'im:releaseDate': Entity<Label>;
  category: Entity<CategoryAttributes>;
  id: Entity<IdAttributes>;
  link: Attributes<LinkAttributes>;
  rights: Label;
  summary: Label;
  title: Label;
}

export interface Genre {
  id: string;
  name: string;
}

export interface PodcastEpisode {
  artistIds: number[];
  artistViewUrl: string;
  artworkUrl160: string;
  artworkUrl60: string;
  artworkUrl600: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  country: string;
  description: string;
  episodeContentType: string;
  episodeFileExtension: string;
  episodeGuid: string;
  episodeUrl: string;
  feedUrl: string;
  genres: Genre[];
  kind: string;
  previewUrl: string;
  releaseDate: string;
  shortDescription: string;
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}

export interface PodcastDescription {
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl100: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl600: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionHdPrice: number;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  currency: string;
  feedUrl: string;
  genreIds: string[];
  genres: string[];
  kind: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}

export interface PodcastResponse {
  feed: {
    entry: Podcast[];
  };
}

export interface PodcastDescriptionResponse {
  resultCount: number;
  results: [PodcastDescription, ...PodcastEpisode[]];
}

export interface PodcastState {
  podcastList: {
    [K: string]: Podcast;
  };
  podcastDescription: PodcastDescription;
  podcastEpisodes: {
    [K: string]: PodcastEpisode;
  };
}

interface GetPodcastRequest {
  type: typeof GET_PODCAST_REQUEST;
}

interface GetPodcastSuccess {
  type: typeof GET_PODCAST_SUCCESS;
  payload: PodcastResponse;
}

interface GetPodcastFailure {
  type: typeof GET_PODCAST_FAILURE;
}

interface GetPodcastDescriptionRequest {
  type: typeof GET_PODCAST_DESCRIPTION_REQUEST;
}

interface GetPodcastDescriptionSuccess {
  type: typeof GET_PODCAST_DESCRIPTION_SUCCESS;
  payload: PodcastDescriptionResponse;
}

interface GetPodcastDescriptionFailure {
  type: typeof GET_PODCAST_DESCRIPTION_FAILURE;
}

export type PodcastActions =
  | GetPodcastRequest
  | GetPodcastSuccess
  | GetPodcastFailure
  | GetPodcastDescriptionRequest
  | GetPodcastDescriptionSuccess
  | GetPodcastDescriptionFailure;
