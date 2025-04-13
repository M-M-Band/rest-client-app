'use client';

import { langs } from '@uiw/codemirror-extensions-langs';
import { monokai as monokaiTheme } from '@uiw/codemirror-theme-monokai';
import CodeMirror from '@uiw/react-codemirror';
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
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
  heading,
  input,
  span,
} = styles;

const languageOptions = [
  { label: 'JSON', value: 'json', extension: langs.json() },
  { label: 'JavaScript', value: 'javascript', extension: langs.javascript() },
  { label: 'Plain text', value: 'plaintext', extension: null },
];

interface RestProps {
  slugs: string[];
}
export interface HistoryItem {
  url: string;
  requestURL: string;
  date: string;
  method: string;
  body: string;
  headers: Header[];
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
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);

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

        const historyLocalStorage: HistoryItem[] = JSON.parse(
          localStorage.getItem(HISTORY_KEY) ?? '[]'
        );
        console.log('historyLocalStorage', historyLocalStorage);

        const now = new Date();
        const formattedDate = now.toLocaleString(); // Format the date as needed

        const newHistoryItem: HistoryItem = {
          url: `${window.location.pathname}${window.location.search}`,
          requestURL: window.location.pathname.split('/')[5],
          date: formattedDate,
          method: method,
          body: body,
          headers: headers,
        };

        historyLocalStorage.push(newHistoryItem);
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

  const addHeader = () => {
    setShowHeaders(true);
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

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = languageOptions.find(
      (lang) => lang.value === e.target.value
    );
    if (selected) {
      setSelectedLanguage(selected);
    }
  };

  return (
    <section className={rest}>
      <h1 className='maintext maintext_green'>REST Client</h1>
      <form
        className={form}
        onSubmit={handleSubmit}
      >
        <input
          className={input}
          type='hidden'
          name='headers'
          value={JSON.stringify(headers)}
        />
        <input
          className={input}
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
              className={`${inputSearch} ${input}`}
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
            className={heading}
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
                      className={input}
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
                      className={input}
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
          <h2 className={heading}>Code:</h2>
        </div>
        {METHODS_WITH_BODY.includes(method) && (
          <div className={`${container} ${container_requestbody}`}>
            <div className={`${container} ${container_nested}`}>
              <h2 className={heading}>Body:</h2>
              <select
                className={selectSearch}
                value={selectedLanguage.value}
                onChange={handleLanguageChange}
              >
                {languageOptions.map((lang) => (
                  <option
                    key={lang.value}
                    value={lang.value}
                  >
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <CodeMirror
              value={body}
              height='200px'
              theme={monokaiTheme}
              extensions={
                selectedLanguage.extension ? [selectedLanguage.extension] : []
              }
              onChange={handleBodyChange}
            />
          </div>
        )}
      </form>
      <div className={response}>
        <h2 className={heading}>Response: </h2>
        {dataResponse.response ? (
          <div className={response__container}>
            <h3 className={response__maintext}>
              Status:{' '}
              <span
                className={span}
              >{`${dataResponse.response.status} - ${dataResponse.status}`}</span>
            </h3>
            <div className={response__container}>
              <h3 className={response__maintext}>Body:</h3>

              <SyntaxHighlighter
                language='json'
                wrapLongLines={true}
                style={monokai}
                className={`${response__precode} syntax-scrollbar`}
              >
                {JSON.stringify(dataResponse.response.data, null, 3)}
              </SyntaxHighlighter>
            </div>
          </div>
        ) : (
          <div className={response__container}>
            <h3 className={response__maintext}>
              Status:{' '}
              <span
                className={span}
              >{`${dataResponse.error} - ${dataResponse.status}`}</span>
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rest;
