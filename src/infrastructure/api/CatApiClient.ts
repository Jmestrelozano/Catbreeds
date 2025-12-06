import axios, { AxiosInstance, AxiosError } from 'axios';
import { CAT_API_KEY, CAT_API_BASE_URL } from '@env';


const API_KEY = CAT_API_KEY;
const BASE_URL = CAT_API_BASE_URL;

// ============================================================================
// 🔧 NETWORK ERROR SIMULATION CONFIGURATION
// ============================================================================
// 
// To simulate different error scenarios, change the value of SIMULATION_TYPE:
// 
// - 'no-internet': Simulates no internet connection
// - 'timeout': Simulates that the request takes too long
// - 'server-error': Simulates a server error (500)
// - null: Disables simulation (normal behavior)
//
// Example: To simulate no internet, change the following line to:
//   const SIMULATION_TYPE: SimulationType = 'no-internet';
//
// ============================================================================

type SimulationType = 'no-internet' | 'timeout' | 'server-error' | null;

// 🔧 CHANGE THIS VALUE TO ENABLE/DISABLE SIMULATION
const SIMULATION_TYPE: SimulationType = null; // Change to 'no-internet', 'timeout', or 'server-error' to test

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

  /**
   * Simulates different types of network errors for testing
   */
  private simulateNetworkError(): never {
    switch (SIMULATION_TYPE) {
      case 'no-internet':
        // Simulate network error (no connection)
        const networkError = new Error('Network Error') as AxiosError;
        networkError.code = 'ERR_NETWORK';
        networkError.isAxiosError = true;
        throw networkError;
      
      case 'timeout':
        // Simulate timeout
        const timeoutError = new Error('timeout of 0ms exceeded') as AxiosError;
        timeoutError.code = 'ECONNABORTED';
        timeoutError.isAxiosError = true;
        throw timeoutError;
      
      case 'server-error':
        // Simulate server error (500)
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
        throw serverError;
      
      default:
        // Don't simulate, continue normally
        throw new Error('Simulation type not implemented');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      // 🔧 SIMULATION: If enabled, throw error before making the real request
      if (SIMULATION_TYPE) {
        // Add a small delay to make it more realistic
        await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
        this.simulateNetworkError();
      }

      const response = await this.client.get<T>(endpoint);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Detect network errors (no internet connection)
        if (
          error.code === 'ERR_NETWORK' ||
          error.message.includes('Network Error') ||
          error.message.includes('network')
        ) {
          throw new Error(
            'No internet connection. Please check your connection and try again.',
          );
        }
        // Detect timeout errors
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          throw new Error(
            'The request took too long. Please check your connection and try again.',
          );
        }
        // Detect server errors (5xx)
        if (error.response?.status && error.response.status >= 500) {
          throw new Error(
            'The server is not available at this moment. Please try again later.',
          );
        }
        // Detect client errors (4xx)
        if (error.response?.status && error.response.status >= 400) {
          throw new Error(
            'Could not retrieve data. Please try again.',
          );
        }
        // Generic error
        throw new Error(
          `Error retrieving data from API: ${error.message}`,
        );
      }
      throw error;
    }
  }
}

