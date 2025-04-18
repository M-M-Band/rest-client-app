import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Link from 'next/link';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import History from '@/components/History/History';

import { HistoryItem } from '@/types/rest.types';

import messages from '@/../messages/en.json';

const localStorageMock = (function () {
  const localStorageStore: { [key: string]: string } = {};
  const setItem = (key: string, value: string) => {
    Object.defineProperty(localStorageStore, key, value);
  };
  const getItem = (key: string): string => {
    return localStorageStore[key];
  };
  const clear = () => {
    delete localStorageStore.key;
  };
  return { setItem, getItem, clear };
})();

Object.defineProperty(window, 'localStorage', localStorageMock);

const mockHistoryItems: HistoryItem[] = [
  {
    url: 'mockurl1',
    requestURL: 'requestURL1',
    date: 'date1',
    method: 'method1',
    body: '',
    headers: [],
  },
  {
    url: 'mockurl2',
    requestURL: 'requestURL2',
    date: 'date2',
    method: 'method2',
    body: '',
    headers: [],
  },
];

vi.mock('next/link', () => ({
  default: vi.fn(({ href, children }) => (
    <a
      href={href}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  )),
}));

describe('History section', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render heading', () => {
    render(
      <NextIntlClientProvider
        locale='en'
        messages={messages}
      >
        <History />
      </NextIntlClientProvider>
    );
    const heading = screen.getByText('History');
    expect(heading).toBeInTheDocument();
  });

  it('should render a message if there are no items', () => {
    render(
      <NextIntlClientProvider
        locale='en'
        messages={messages}
      >
        <History />
      </NextIntlClientProvider>
    );
    const noItemsMessage = screen.getByText('No history items');
    expect(noItemsMessage).toBeInTheDocument();
  });

  it('should render proper number of history items from localStorage', () => {
    localStorage.setItem('historyUrls', JSON.stringify(mockHistoryItems));
    render(
      <NextIntlClientProvider
        locale='en'
        messages={messages}
      >
        <History />
      </NextIntlClientProvider>
    );
    const dateField = screen.getAllByText(/Date:/i);
    const methodField = screen.getAllByText(/Method:/i);
    const urlField = screen.getAllByText(/URL:/i);
    expect(dateField).toHaveLength(2);
    expect(methodField).toHaveLength(2);
    expect(urlField).toHaveLength(2);
  });

  it('should render history items from localStorage data with proper fields', () => {
    localStorage.setItem('historyUrls', JSON.stringify(mockHistoryItems));
    render(
      <NextIntlClientProvider
        locale='en'
        messages={messages}
      >
        <History />
      </NextIntlClientProvider>
    );
    const dateField = screen.getAllByText(/Date:/i);
    const methodField = screen.getAllByText(/Method:/i);
    const urlField = screen.getAllByText(/URL:/i);
    expect(dateField[0]).toHaveTextContent(/date2/i);
    expect(dateField[1]).toHaveTextContent(/date1/i);

    expect(methodField[0]).toHaveTextContent(/method2/i);
    expect(methodField[1]).toHaveTextContent(/method1/i);

    expect(urlField[0]).toHaveTextContent(atob('requestURL2'));
    expect(urlField[1]).toHaveTextContent(atob('requestURL1'));
  });

  it('should navigate to to previous request when clicked', () => {
    localStorage.setItem('historyUrls', JSON.stringify(mockHistoryItems));
    render(
      <NextIntlClientProvider
        locale='en'
        messages={messages}
      >
        <MemoryRouterProvider>
          <History />
        </MemoryRouterProvider>
      </NextIntlClientProvider>
    );
    screen.debug();
    const urlField = screen.getAllByText(/URL/i);
    fireEvent.click(urlField[0]);

    expect(Link).toHaveBeenCalled();
  });
});
