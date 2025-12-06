import axios, { AxiosInstance } from 'axios';
import { CAT_API_KEY, CAT_API_BASE_URL } from '@env';

const API_KEY = CAT_API_KEY;
const BASE_URL = CAT_API_BASE_URL;
export class CatApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'x-api-key': API_KEY,
      },
      params: {
        api_key: API_KEY,
      },
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.get<T>(endpoint);
      return response.data;
    } catch (error: any) {
      const isAxiosError = axios.isAxiosError(error) || error.isAxiosError === true;
      
      if (isAxiosError) {
        if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
          throw new Error(
            'No internet connection. Please check your connection and try again.',
          );
        }

        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          throw new Error(
            'The request took too long. Please check your connection and try again.',
          );
        }

        if (error.response?.status && error.response.status >= 500) {
          throw new Error(
            'The server is not available at this moment. Please try again later.',
          );
        }

        if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
          throw new Error(
            'Could not retrieve data. Please try again.',
          );
        }

        throw new Error(
          `Error retrieving data from API: ${error.message || 'Unknown error'}`,
        );
      }
      throw error;
    }
  }
}

