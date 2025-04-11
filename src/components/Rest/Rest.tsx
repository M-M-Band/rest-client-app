'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { toast } from 'sonner';

import {
  FormDataType,
  HTTP_METHODS,
  Header,
  METHODS_WITH_BODY,
  initialState,
} from '@/types/rest.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { applyVariables } from '@/utils/applyVariables';
import { HISTORY_KEY } from '@/utils/constants';
import { filterString } from '@/utils/helpers';

import styles from './rest.module.css';
import { useVariables } from '@/context/VariablesContext';

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

const Rest: FC<RestProps> = ({ slugs }) => {
  const { variables } = useVariables();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const BASEPATH = `/${locale}${DASHBOARD_PAGES.REST}`;

  const [isPending, startTransition] = useTransition();

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState<Header[]>(() => {
    const arr: Header[] = [];
    if (searchParams.size)
      searchParams.forEach((value, key) => arr.push({ key, value }));
    return searchParams.size
      ? arr
      : [{ key: 'Content-Type', value: 'application/json' }];
  });

  const [dataResponse, setDataResponse] = useState(initialState);
  const [showHeaders, setShowHeaders] = useState(true);

  const inputTableRefs = useRef<(HTMLInputElement | null)[]>([]);
  const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputTableRefs.current[index] = el;
  };

  const updateURL = useCallback(() => {
    const encodedUrl = url
      ? filterString(Buffer.from(url).toString('base64'))
      : '';
    const encodedBody = body
      ? filterString(Buffer.from(body).toString('base64'))
      : '';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData(e.currentTarget);
        const { method, headers, body, url } = {
          ...Object.fromEntries(form.entries()),
          headers: JSON.parse(form.get('headers') as string) as Header[],
        } as FormDataType;

        const { replaced: parsedUrl, unmatchedVariables: urlUnmatched } =
          applyVariables(url, variables);
        const { replaced: parsedBody, unmatchedVariables: bodyUnmatched } =
          applyVariables(body, variables);

        const parsedHeaders = headers.map(({ key, value }) => {
          const { replaced: parsedKey, unmatchedVariables: keyUnmatched } =
            applyVariables(key, variables);
          const { replaced: parsedValue, unmatchedVariables: valueUnmatched } =
            applyVariables(value, variables);
          return {
            key: parsedKey,
            value: parsedValue,
            unmatched: [...keyUnmatched, ...valueUnmatched],
          };
        });

        const allUnmatched = [
          ...urlUnmatched,
          ...bodyUnmatched,
          ...parsedHeaders.flatMap((header) => header.unmatched),
        ];

        if (allUnmatched.length > 0) {
          toast.error(
            `Не найдены переменные: ${[...new Set(allUnmatched)].join(', ')}`
          );
          return;
        }

        const options: RequestInit = {
          method,
          headers: parsedHeaders.reduce(
            (acc, { key, value }) => {
              if (key && value) acc[key] = value;
              return acc;
            },
            {} as Record<string, string>
          ),
        };

        if (METHODS_WITH_BODY.includes(method) && parsedBody) {
          options.body = parsedBody;
        }

        const response = await fetch(parsedUrl, options);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const historyLocalStorage: string[] = JSON.parse(
          localStorage.getItem(HISTORY_KEY) ?? '[]'
        );
        historyLocalStorage.push(
          `${window.location.pathname}/${window.location.search}`
        );
        localStorage.setItem(HISTORY_KEY, JSON.stringify(historyLocalStorage));

        setDataResponse({
          status: 'success',
          response: {
            status: response.status,
            data,
          },
          error: null,
        });
      } catch (error) {
        setDataResponse({
          status: 'error',
          response: null,
          error: error instanceof Error ? error.message : 'Unknown Error',
        });
      }
    });
  };

  useEffect(() => {
    if (slugs) {
      const [method, url, body] = slugs;
      if (method) {
        setMethod(method);
      }
      if (url) {
        setUrl(Buffer.from(url, 'base64').toString('utf8'));
      }
      if (body) {
        setBody(Buffer.from(body, 'base64').toString('utf8'));
      }
    }
  }, [slugs]);

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
        onSubmit={handleSubmit}
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
          <h2
            onClick={() => setShowHeaders((prev) => !prev)}
            style={{ cursor: 'pointer' }}
          >
            {showHeaders ? '▼' : '▶'} Headers:
          </h2>
          <button
            className={`button ${button_border}`}
            type='button'
            onClick={addHeader}
          >
            Add header
          </button>
        </div>
        {showHeaders && (
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
        )}

        <div className={`${container} ${container_nested}`}>
          <h2>Code:</h2>
        </div>
        {METHODS_WITH_BODY.includes(method) && (
          <div className={`${container} ${container_requestbody}`}>
            <h2>Body:</h2>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onBlur={handleBodyBlur}
              placeholder='Request body (JSON)'
              rows={6}
            ></textarea>
          </div>
        )}
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
