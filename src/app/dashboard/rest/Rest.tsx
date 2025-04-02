'use client';

import { useActionState, useEffect, useRef, useState } from 'react';

import { HTTP_METHODS, Header, initialState } from '@/types/rest.types';

import { sendRequest } from '@/utils/rest-actions';

import styles from './rest.module.css';

const {
  rest,
  form,
  container,
  container_headers,
  headers__table,
  container_search,
  selectSearch,
  inputSearch,
  button,
  button_border,
  response,
  code,
} = styles;

const Rest = () => {
  const [state, formAction, isPending] = useActionState(
    sendRequest,
    initialState
  );
  const [headers, setHeaders] = useState<Header[]>([
    { key: 'Content-Type', value: 'application/json' },
  ]);
  // const [body, setBody] = useState('');
  const [method, setMethod] = useState('GET');

  const inputTableRefs = useRef<(HTMLInputElement | null)[]>([]);
  const inputSearchRef = useRef<HTMLInputElement | null>(null);

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputTableRefs.current[index] = el;
  };

  useEffect(() => {
    if (inputSearchRef.current) {
      const color = HTTP_METHODS.find((m) => m.value === method)?.color ?? '';
      inputSearchRef.current.style.borderColor = color;
    }
  }, [method]);
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
        action={formAction}
      >
        <input
          type='hidden'
          name='headers'
          value={JSON.stringify(headers)}
        />
        <div className={container}>
          <div className={`${container} ${container_search}`}>
            <select
              name='method'
              value={method}
              onChange={(e) => setMethod(e.target.value)}
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
              name='url'
              type='url'
              defaultValue='https://jsonplaceholder.typicode.com/posts'
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
        <div className={`${container} ${container_headers}`}>
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
      </form>
      <div className={response}>
        <h2>Response: </h2>
        {state.response && (
          <pre className={code}>
            {JSON.stringify(state.response.data, null, 3)}
          </pre>
        )}
      </div>
    </section>
  );
};
export default Rest;
