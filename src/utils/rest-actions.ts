'use server';

// import {} from 'next/cache';
// import { redirect } from 'next/navigation';

// import { FormDataType, Header, State } from '@/types/rest.types';
// export const sendRequest = async (
//   state: any,
//   formData: FormData
// ): Promise<void> => {
// try {
// console.log(formData);
// const router = useRouter()
// console.log(router)
// const method = formData.get('method') as string;
// const url = formData.get('url') as string;
// const headers = JSON.parse(formData.get('headers') as string) as Header[];
// const body = formData.get('body') as string;
// const pathname = formData.get('pathname') as string;

//     const options: RequestInit = {
//       method,
//       headers: headers.reduce(
//         (acc, { key, value }) => {
//           if (key) acc[key] = value;
//           return acc;
//         },
//         {} as Record<string, string>
//       ),
//     };
//
//     if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
//       options.body = body;
//     }
// const startTime = Date.now();
// const response = await fetch(url, options);
// const data = await response.json();
// const endTime = Date.now();

// if (!response.ok) {
//   throw new Error(`HTTP error! status: ${response.status}`)
// }

// const data = {
//   ...Object.fromEntries(formData.entries()),
//   headers: JSON.parse(formData.get('headers') as string) as Header[],
// } as FormDataType;
// const pathname = formData.get('pathname');

// const encodedUrl = data.url ? Buffer.from(data.url).toString('base64') : '';
// const encodedBody = data.body
//   ? Buffer.from(data.body).toString('base64')
//   : '';

// const apiPath = `/${data.method}/${encodedUrl}${encodedBody ? `/${encodedBody}` : ''}`;
// const params = new URLSearchParams();
// data.headers.forEach((h: Header) => {
//   if (h.key && h.value) {
//     params.append(h.key, encodeURIComponent(h.value));
//   }
// });

// console.log(params, state)

// // console.log(data.headers);

// const normalizePath = (path: string) =>
//   path.replace(/\/+/g, '/').replace(/\/$/, '');

// const currentFullPath = normalizePath(
//   `${pathname}?${searchParams.toString()}`
// );
// const newFullPath = normalizePath(
//   `${BASEPATH}${apiPath}?${params.toString()}`
// );
// console.log(window.location);
// if (currentFullPath !== newFullPath) {
//   const finalUrl = `${pathname}${apiPath}${params.toString() ? `?${params.toString()}` : ''}`;
//   // redirect(finalUrl)
// } else {
//   // fetchData();
//   console.log('URL identical - skipping navigation');
// }

// redirect(`${pathname}/${method}/${btoa(url)}`)
//   return {
//     status: 'success',
//     response: {
//       status: response.status,
//       url: `${method}/${btoa(url)}`,
//       headers: Object.fromEntries(response.headers.entries()),
//       data,
//       time: `${endTime - startTime}ms`,
//     },
//     error: null,
//   };
// } catch (error) {
//   return {
//     status: 'error',
//     response: null,
//     error: error instanceof Error ? error.message : 'Unknown error',
//   };
// }
// };
