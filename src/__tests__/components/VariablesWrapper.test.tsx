import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

// import Spinner from '@/components/Spinner/Spinner';
import VariablesWrapper from '@/components/Variables/VariablesWrapper';

// Мокируем компонент Variables
const MockVariables = vi.fn(() => <div data-testid='variables'>Variables</div>);
vi.mock('@/components/Variables/Variables', async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    default: MockVariables,
  };
});

describe('VariablesWrapper', () => {
  it('should render Spinner initially', () => {
    render(
      <MemoryRouterProvider>
        <VariablesWrapper />
      </MemoryRouterProvider>
    );

    // Проверяем, что Spinner отображается
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render Variables after loading', async () => {
    render(
      <MemoryRouterProvider>
        <VariablesWrapper />
      </MemoryRouterProvider>
    );

    // Ожидаем, пока компонент Variables загрузится
    await waitFor(() => {
      expect(screen.getByTestId('variables')).toBeInTheDocument();
    });

    // Проверяем, что мокированный компонент Variables был вызван
    expect(MockVariables).toHaveBeenCalled();
  });
});
