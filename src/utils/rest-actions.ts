'use server';

import { State } from '@/types/rest.types';

export const sendRequest = async (
  _: State,
  formData: FormData
): Promise<State> => {
  try {
    const method = formData.get('method') as string;
    const url = formData.get('url') as string;
    // const headers = JSON.parse(formData.get('headers') as string) as Header[];
    // const body = formData.get('body') as string;

    const options: RequestInit = {
      method,
      // headers: headers.reduce((acc, { key, value }) => {
      //   if (key) acc[key] = value;
      //   return acc;
      // }, {}  as Record<string, string>),
    };

    // if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
    //   options.body = body;
    // }
    const startTime = Date.now();
    const response = await fetch(url, options);
    const data = await response.json();
    const endTime = Date.now();

    return {
      status: 'success',
      response: {
        status: response.status,
        // headers: Object.fromEntries(response.headers.entries()),
        data,
        time: `${endTime - startTime}ms`,
      },
      error: null,
    };
  } catch (error) {
    return {
      status: 'error',
      response: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
