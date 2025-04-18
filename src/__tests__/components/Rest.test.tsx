import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import { afterEach } from 'node:test';
import { describe, expect, it, vi } from 'vitest';

import Rest from '@/components/Rest/Rest';

import { VariablesProvider } from '@/context/VariablesContext';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

describe('Rest', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render initial state', () => {
    const locale = 'en';
    render(
      <MemoryRouterProvider>
        <NextIntlClientProvider locale={locale}>
          <VariablesProvider>
            <Rest slugs={[]} />
          </VariablesProvider>
        </NextIntlClientProvider>
      </MemoryRouterProvider>
    );
    console.log(window.location.toString());
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByTestId('method')).toHaveValue('GET');
    expect(screen.getByTestId('url')).toHaveValue('');
    expect(screen.getAllByTestId('headers')).toHaveLength(1);
  });

  it('should change method from GET to POST', async () => {
    const locale = 'en';
    render(
      <MemoryRouterProvider>
        <NextIntlClientProvider locale={locale}>
          <VariablesProvider>
            <Rest slugs={[]} />
          </VariablesProvider>
        </NextIntlClientProvider>
      </MemoryRouterProvider>
    );
    const user = userEvent.setup();
    const selectMethodElement = screen.getByTestId('method');

    expect(selectMethodElement).toHaveValue('GET');

    await user.selectOptions(selectMethodElement, ['POST']);

    expect(selectMethodElement).toHaveValue('POST');
  });

  it('should change url from "" to https://jsonplaceholder.typicode.com/posts', async () => {
    const locale = 'en';
    render(
      <MemoryRouterProvider>
        <NextIntlClientProvider locale={locale}>
          <VariablesProvider>
            <Rest slugs={[]} />
          </VariablesProvider>
        </NextIntlClientProvider>
      </MemoryRouterProvider>
    );
    const user = userEvent.setup();
    const urlElement = screen.getByTestId('url');

    expect(urlElement).toHaveValue('');

    await user.type(urlElement, 'https://jsonplaceholder.typicode.com/posts');

    expect(urlElement).toHaveValue(
      'https://jsonplaceholder.typicode.com/posts'
    );
  });

  it('should request and get response', async () => {
    const locale = 'en';
    render(
      <MemoryRouterProvider>
        <NextIntlClientProvider locale={locale}>
          <VariablesProvider>
            <Rest slugs={[]} />
          </VariablesProvider>
        </NextIntlClientProvider>
      </MemoryRouterProvider>
    );
    const user = userEvent.setup();
    const urlElement = screen.getByTestId('url');
    const selectMethodElement = screen.getByTestId('method');
    const buttonSubmit = screen.getByTestId('submit');

    expect(selectMethodElement).toHaveValue('GET');
    expect(urlElement).toHaveValue('');
    expect(screen.getByText(/null - idle/i)).toBeInTheDocument();

    await user.type(urlElement, 'https://jsonplaceholder.typicode.com/posts');

    expect(urlElement).toHaveValue(
      'https://jsonplaceholder.typicode.com/posts'
    );

    await user.click(buttonSubmit);

    expect(buttonSubmit).toBeDisabled();

    await waitFor(() => expect(buttonSubmit).toBeEnabled());
    expect(screen.getByText(/200 - success/i)).toBeInTheDocument();
  });
});
