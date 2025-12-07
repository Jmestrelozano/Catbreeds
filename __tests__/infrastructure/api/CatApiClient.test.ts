jest.mock('axios');

import axios from 'axios';
import { CatApiClient } from '../../../src/infrastructure/api/CatApiClient';
import { AxiosError } from 'axios';

describe('CatApiClient', () => {
  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should make a successful GET request', async () => {
      const mockData = { id: 'test', name: 'Test' };
      const mockResponse = { data: mockData };
      (mockAxios.create as any).mockReturnValue({
        get: jest.fn().mockResolvedValue(mockResponse),
      });

      const newClient = new CatApiClient();
      const result = await newClient.get('/test');

      expect(result).toEqual(mockData);
    });

    it('should handle network errors (no internet)', async () => {
      const networkError = new Error('Network Error') as AxiosError;
      networkError.code = 'ERR_NETWORK';
      networkError.isAxiosError = true;

      (mockAxios.create as any).mockReturnValue({
        get: jest.fn().mockRejectedValue(networkError),
      });

      const newClient = new CatApiClient();
      await expect(newClient.get('/test')).rejects.toThrow(
        'No internet connection. Please check your connection and try again.',
      );
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('timeout of 0ms exceeded') as AxiosError;
      timeoutError.code = 'ECONNABORTED';
      timeoutError.isAxiosError = true;

      (mockAxios.create as any).mockReturnValue({
        get: jest.fn().mockRejectedValue(timeoutError),
      });

      const newClient = new CatApiClient();
      await expect(newClient.get('/test')).rejects.toThrow(
        'The request took too long. Please check your connection and try again.',
      );
    });

    it('should handle server errors (5xx)', async () => {
      const serverError = new Error('Request failed with status code 500') as AxiosError;
      serverError.code = 'ERR_BAD_RESPONSE';
      serverError.isAxiosError = true;
      serverError.response = {
        status: 500,
        statusText: 'Internal Server Error',
        data: {},
        headers: {},
        config: {} as any,
      };

      (mockAxios.create as any).mockReturnValue({
        get: jest.fn().mockRejectedValue(serverError),
      });

      const newClient = new CatApiClient();
      await expect(newClient.get('/test')).rejects.toThrow(
        'The server is not available at this moment. Please try again later.',
      );
    });

    it('should handle client errors (4xx)', async () => {
      const clientError = new Error('Request failed with status code 404') as AxiosError;
      clientError.code = 'ERR_BAD_RESPONSE';
      clientError.isAxiosError = true;
      clientError.response = {
        status: 404,
        statusText: 'Not Found',
        data: {},
        headers: {},
        config: {} as any,
      };

      (mockAxios.create as any).mockReturnValue({
        get: jest.fn().mockRejectedValue(clientError),
      });

      const newClient = new CatApiClient();
      await expect(newClient.get('/test')).rejects.toThrow(
        'Could not retrieve data. Please try again.',
      );
    });

    it('should handle generic axios errors', async () => {
      const genericError = new Error('Generic axios error') as AxiosError;
      genericError.isAxiosError = true;

      (mockAxios.create as any).mockReturnValue({
        get: jest.fn().mockRejectedValue(genericError),
      });

      const newClient = new CatApiClient();
      await expect(newClient.get('/test')).rejects.toThrow(
        'Error retrieving data from API: Generic axios error',
      );
    });

    it('should handle non-axios errors', async () => {
      const nonAxiosError = new Error('Non-axios error');

      (mockAxios.create as any).mockReturnValue({
        get: jest.fn().mockRejectedValue(nonAxiosError),
      });

      const newClient = new CatApiClient();
      await expect(newClient.get('/test')).rejects.toThrow('Non-axios error');
    });
  });

  describe('constructor', () => {
    it('should create an axios instance with correct configuration', () => {
      new CatApiClient();
      expect(mockAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.test.com',
        headers: {
          'x-api-key': 'test-api-key',
        },
        params: {
          api_key: 'test-api-key',
        },
      });
    });
  });
});

