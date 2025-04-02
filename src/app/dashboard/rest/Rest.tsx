'use client';

import { ChangeEvent, useActionState, useState } from 'react';

import { HTTP_METHODS, initialState } from '@/types/rest.types';

import { sendRequest } from '@/utils/rest-actions';

import styles from './rest.module.css';

const {
  rest,
  form,
  container,
  container_search,
  selectSearch,
  inputSearch,
  button,
  response,
  code,
} = styles;

const Rest = () => {
  const [state, formAction, isPending] = useActionState(
    sendRequest,
    initialState
  );
  // const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  // const [body, setBody] = useState('');
  const [method, setMethod] = useState('GET');
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setMethod(value);
  };
  return (
    <section className={rest}>
      <h1 className='maintext maintext_green'>REST Client</h1>
      <form
        className={form}
        action={formAction}
      >
        <div className={container}>
          <div className={`${container} ${container_search}`}>
            <select
              name='method'
              value={method}
              onChange={handleSelect}
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
      </form>

      {state.response && (
        <div className={response}>
          <pre className={code}>
            {JSON.stringify(state.response.data, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
};
export default Rest;
