'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface Variable {
  name: string;
  value: string;
}

interface VariablesContextProps {
  variables: Variable[];
  addVariable: (variable: Variable) => void;
  updateVariable: (index: number, variable: Variable) => void;
  removeVariable: (index: number) => void;
  loadVariables: () => void;
}

const VariablesContext = createContext<VariablesContextProps | undefined>(
  undefined
);

export const useVariables = () => {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error('useVariables must be used within a VariablesProvider');
  }
  return context;
};

interface VariablesProviderProps {
  children: ReactNode;
}

export const VariablesProvider: React.FC<VariablesProviderProps> = ({
  children,
}) => {
  const [variables, setVariables] = useState<Variable[]>([]);

  useEffect(() => {
    loadVariables();
  }, []);

  useEffect(() => {
    localStorage.setItem('variables', JSON.stringify(variables));
  }, [variables]);

  const addVariable = (variable: Variable) => {
    setVariables([...variables, variable]);
  };

  const updateVariable = (index: number, variable: Variable) => {
    const newVariables = [...variables];
    newVariables[index] = variable;
    setVariables(newVariables);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const loadVariables = () => {
    const storedVariables = localStorage.getItem('variables');
    if (storedVariables) {
      setVariables(JSON.parse(storedVariables));
    }
  };

  const contextValue: VariablesContextProps = {
    variables,
    addVariable,
    updateVariable,
    removeVariable,
    loadVariables,
  };

  return (
    <VariablesContext.Provider value={contextValue}>
      {children}
    </VariablesContext.Provider>
  );
};
