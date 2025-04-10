'use client';

import { useLocale } from 'next-intl';
import {
  ChangeEvent,
  FC,
  // FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  // useTransition,
} from 'react';

import {
  // FormDataType,
  HTTP_METHODS,
  Header,
  // initialState,
} from '@/types/rest.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import styles from './rest.module.css';

const {
  rest,
  form,
  container,
  container_nested,
  container_requestbody,
  headers__table,
  container_search,
  selectSearch,
  inputSearch,
  button,
  button_border,
  response,
  response__maintext,
  response__precode,
  response__container,
} = styles;

interface RestProps {
  slugs: string[];
}

const Rest: FC<RestProps> = () => {
  const locale = useLocale();
  const BASEPATH = `/${locale}${DASHBOARD_PAGES.REST}`;
  // const [isPending, startTransition] = useTransition();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState<Header[]>([
    { key: 'Content-Type', value: 'application/json' },
  ]);
  // const [dataResponse, setDataResponse] = useState(initialState);

  const inputTableRefs = useRef<(HTMLInputElement | null)[]>([]);
  const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputTableRefs.current[index] = el;
  };

  const updateURL = useCallback(() => {
    const encodedUrl = url ? Buffer.from(url).toString('base64') : '';
    const encodedBody = body ? Buffer.from(body).toString('base64') : '';
    const headersParams = new URLSearchParams();
    headers.forEach((header) => {
      if (header.key && header.value) {
        headersParams.append(header.key, header.value);
      }
    });

    const pathSegments = [BASEPATH, method, encodedUrl, encodedBody].filter(
      Boolean
    );

    const fullUrl = headersParams.toString()
      ? `${pathSegments.join('/')}?${headersParams}`
      : pathSegments.join('/');

    window.history.replaceState(null, '', fullUrl);
  }, [BASEPATH, body, url, method, headers]);

  // const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
  //   const url = `${BASEPATH}/method/`;
  // };

  // const fetchData = useCallback(
  //   async (data: string[]) => {
  //     const [methodFetch, urlFetch, bodyFetch] = data;
  //     try {
  //       const url = Buffer.from(urlFetch, 'base64').toString('utf-8');
  //       const headersArray = Object.fromEntries(searchParams.entries());
  //       const options: RequestInit = {
  //         method: methodFetch,
  //         headers: headersArray,
  //       };
  //       if (['POST', 'PUT', 'PATCH'].includes(methodFetch) && bodyFetch) {
  //         options.body = bodyFetch;
  //       }
  //       const response = await fetch(url, options);
  //       const data = await response.json();
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       setDataResponse({
  //         status: 'success',
  //         response: {
  //           status: response.status,
  //           data,
  //         },
  //         error: null,
  //       });
  //     } catch (error) {
  //       setDataResponse({
  //         status: 'error',
  //         response: null,
  //         error: error instanceof Error ? error.message : 'Unknown Error',
  //       });
  //     }
  //   },
  //   [searchParams]
  // );

  // useEffect(() => {
  //   if (slugs) {
  //     fetchData(slugs);
  //   }
  // }, [slugs, fetchData]);

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   startTransition(() => {
  //     const form = new FormData(e.currentTarget);
  //     const data = {
  //       ...Object.fromEntries(form.entries()),
  //       headers: JSON.parse(form.get('headers') as string) as Header[],
  //     } as FormDataType;

  //     const encodedUrl = data.url
  //       ? Buffer.from(data.url).toString('base64')
  //       : '';
  //     const encodedBody = data.body
  //       ? Buffer.from(data.body).toString('base64')
  //       : '';

  //     const apiPath = `/${data.method}/${encodedUrl}${encodedBody ? `/${encodedBody}` : ''}`;
  //     const params = new URLSearchParams();
  //     data.headers.forEach((h: Header) => {
  //       if (h.key && h.value) {
  //         params.append(h.key, encodeURIComponent(h.value));
  //       }
  //     });

  //     const normalizePath = (path: string) =>
  //       path.replace(/\/+/g, '/').replace(/\/$/, '');

  //     const currentFullPath = normalizePath(
  //       `${pathname}?${searchParams.toString()}`
  //     );
  //     const newFullPath = normalizePath(
  //       `${BASEPATH}${apiPath}?${params.toString()}`
  //     );
  //     if (currentFullPath !== newFullPath) {
  //       const finalUrl = `${BASEPATH}${apiPath}${params.toString() ? `?${params.toString()}` : ''}`;
  //       router.push(finalUrl);
  //     } else {
  //       console.log('URL identical - skipping navigation');
  //     }
  //   });
  // };
  useEffect(() => {
    updateURL();
  }, [updateURL]);

  useEffect(() => {
    if (inputSearchRef.current) {
      const color = HTTP_METHODS.find((m) => m.value === method)?.color ?? '';
      inputSearchRef.current.style.borderColor = color;
    }
  }, [method]);

  const handleMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleBodyBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
    setTimeout(() => {
      inputTableRefs.current[headers.length]?.focus();
    }, 0);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
    inputTableRefs.current = inputTableRefs.current.filter(
      (_, i) => i !== index
    );
  };

  const handleHeaderChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <section className={rest}>
      <h1 className='maintext maintext_green'>REST Client</h1>
      <form
        className={form}
        // onSubmit={handleSubmit}
        // onChange={(e) => console.log(e)}
      >
        <input
          type='hidden'
          name='headers'
          value={JSON.stringify(headers)}
        />
        <input
          type='hidden'
          name='body'
          value={body}
        />
        <div className={container}>
          <div className={`${container} ${container_search}`}>
            <select
              name='method'
              value={method}
              onChange={handleMethodChange}
              className={selectSearch}
            >
              {HTTP_METHODS.map(({ value, color }) => {
                return (
                  <option
                    key={value}
                    value={value}
                    style={{ color: color }}
                  >
                    {value}
                  </option>
                );
              })}
            </select>
            <input
              className={inputSearch}
              ref={inputSearchRef}
              onChange={handleUrlChange}
              value={url}
              name='url'
              type='url'
              placeholder='https://jsonplaceholder.typicode.com'
              required
            />
          </div>
          <button
            type='submit'
            disabled={isPending}
            className={`button button_colored ${button}`}
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
        <div className={`${container} ${container_nested}`}>
          <h2>Headers:</h2>
          <button
            className={`button ${button_border}`}
            type='button'
            onClick={addHeader}
          >
            Add header
          </button>
        </div>
        <table className={headers__table}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {headers.map((header, index) => (
              <tr key={index}>
                <td>
                  <input
                    type='text'
                    placeholder='Header name'
                    value={header.key}
                    onChange={(e) =>
                      handleHeaderChange(index, 'key', e.target.value)
                    }
                    ref={setInputRef(index)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    placeholder='Header value'
                    value={header.value}
                    onChange={(e) =>
                      handleHeaderChange(index, 'value', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    type='button'
                    className={`button ${button_border}`}
                    onClick={() => removeHeader(index)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={`${container} ${container_nested}`}>
          <h2>Code:</h2>
        </div>
        <div className={`${container} ${container_requestbody}`}>
          <h2>Body:</h2>
          <textarea
            onBlur={handleBodyBlur}
            placeholder='Request body (JSON)'
            rows={6}
          ></textarea>
        </div>
      </form>
      <div className={response}>
        <h2>Response: </h2>
        {dataResponse.response ? (
          <div className={response__container}>
            <h3 className={response__maintext}>
              Status:{' '}
              <span>{`${dataResponse.response.status} - ${dataResponse.status}`}</span>
            </h3>
            <div className={response__container}>
              <h3 className={response__maintext}>Body:</h3>

              <pre className={response__precode}>
                {JSON.stringify(dataResponse.response.data, null, 3)}
              </pre>
            </div>
          </div>
        ) : (
          <div className={response__container}>
            <h3 className={response__maintext}>
              Status:{' '}
              <span>{`${dataResponse.error} - ${dataResponse.status}`}</span>
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};
export default Rest;
