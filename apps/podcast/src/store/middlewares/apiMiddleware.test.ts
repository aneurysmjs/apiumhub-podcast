import axios from 'axios';
import { Dispatch, legacy_createStore as createStore } from 'redux';
import { expect, jest, it } from '@jest/globals';

import apiMiddleware from './apiMiddleware';

const items = [
  {
    id: '5cc2def690118411e1311e92',
    name: 'some fake name',
  },
  {
    id: '5cc2df4790118411e1311e93',
    name: 'another fake name',
  },
];

const response = { data: items };
const error = { message: 'Request failed with status code 404' };

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const requestTypes = [REQUEST, SUCCESS, FAILURE];

let store: ReturnType<typeof createStore>;
let nextHandler: ReturnType<typeof apiMiddleware>;

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  /**
   * @link https://gist.github.com/iamdey/71528fd155d10099d0bb0e4a56d2b558
   */
  store = createStore(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
  store.dispatch = jest.fn(store.dispatch);
  nextHandler = apiMiddleware(store);
});

afterEach(() => {
  mockAxios.mockReset();
});

describe('apiMiddleware', () => {
  it('must return a function to handle next', () => {
    expect(nextHandler).toBeInstanceOf(Function);
    expect(nextHandler.length).toEqual(1);
  });

  describe('handle next', () => {
    it('must return a function to handle action', () => {
      const actionHandler = nextHandler(store.dispatch);
      expect(actionHandler).toBeInstanceOf(Function);
      expect(actionHandler.length).toEqual(1);
    });

    describe('handle action', () => {
      it("should call next when is a 'normal' action", () => {
        const actionObj = {
          callAPI: () => Promise.resolve(),
        };
        const dispatch = jest.fn<Dispatch>();

        const actionHandler = nextHandler(dispatch as Dispatch);

        actionHandler(actionObj);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toMatchObject(actionObj);
      });

      it("should throw when 'types' property is not correct", () => {
        const actionObj = {
          meta: {
            types: [],
            callAPI: () => Promise.resolve(),
          },
        };

        const actionHandler = nextHandler(store.dispatch);

        expect(() => {
          actionHandler(actionObj);
        }).toThrow('Expected an array of three string types.');
      });

      it("should throw when there's no 'callAPI' property", () => {
        const actionObj = {
          meta: {
            types: requestTypes,
          },
        };

        const actionHandler = nextHandler(store.dispatch);

        expect(() => {
          actionHandler(actionObj);
        }).toThrow('Expected callAPI to be a function.');
      });

      it("should 'success' the API call", async () => {
        mockAxios.get.mockReturnValue(Promise.resolve(response));

        const actionObj = {
          meta: {
            types: requestTypes,
            callAPI: jest.fn(() => mockAxios.get('someApiEndpoint')),
          },
        };

        const actionHandler = nextHandler(store.dispatch);

        await actionHandler(actionObj);

        // The first argument of the first call is a REQUEST
        expect((store.dispatch as jest.Mock).mock.calls[0][0]).toMatchObject({ type: REQUEST });
        // callAPI should been called
        expect(actionObj.meta.callAPI).toHaveBeenCalledTimes(1);
        // check that was called with the right endpoint
        expect(mockAxios.get).toHaveBeenCalledWith('someApiEndpoint');
        // The first argument of the second call is a SUCCESS
        expect((store.dispatch as jest.Mock).mock.calls[1][0]).toMatchObject({
          type: SUCCESS,
          payload: items,
        });
      });

      it("should 'fail' the API call", async () => {
        mockAxios.get.mockReturnValue(Promise.reject(error));

        const actionObj = {
          meta: {
            types: requestTypes,
            callAPI: jest.fn(() => mockAxios.get('someBadApiEndpoint')),
          },
        };

        const actionHandler = nextHandler(store.dispatch);

        await actionHandler(actionObj);

        // The first argument of the first call is a REQUEST
        expect((store.dispatch as jest.Mock).mock.calls[0][0]).toMatchObject({ type: REQUEST });
        // callAPI should been called
        expect(actionObj.meta.callAPI).toHaveBeenCalledTimes(1);
        // check that was called with the right endpoint
        expect(mockAxios.get).toHaveBeenCalledWith('someBadApiEndpoint');
        // The first argument of the second call is a FAILURE
        expect((store.dispatch as jest.Mock).mock.calls[1][0]).toMatchObject({
          type: FAILURE,
          payload: error.message,
        });
      });

      it('should NOT call the API', async () => {
        mockAxios.get.mockReturnValue(Promise.resolve(response));

        const actionObj = {
          meta: {
            types: requestTypes,
            callAPI: jest.fn(() => mockAxios.get('endpoint')),
            shouldCallAPI: () => false,
          },
        };

        const actionHandler = nextHandler(store.dispatch);

        await actionHandler(actionObj);

        expect(store.dispatch).not.toHaveBeenCalled();
        // callAPI should NOT been called
        expect(actionObj.meta.callAPI).toHaveBeenCalledTimes(0);
      });
    });
  });
});
