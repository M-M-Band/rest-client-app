'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import styles from './Variables.module.css';
import { useVariables } from '@/context/VariablesContext';

const {
  variables,
  variables__container,
  variables__table,
  variables__input,
  variables__add,
  button_border,
} = styles;

export const Variables = () => {
  const {
    variables: storedVariables,
    addVariable,
    updateVariable,
    removeVariable,
  } = useVariables();
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableValue, setNewVariableValue] = useState('');

  const handleVariableChange = (
    index: number | null,
    updatedVariable: { name: string; value: string }
  ) => {
    if (!updatedVariable.name || !updatedVariable.value) {
      toast.error('Name and value cannot be empty.');
      return;
    }

    const isDuplicate = storedVariables.some(
      (variable, i) =>
        (index === null || i !== index) &&
        variable.name === updatedVariable.name
    );

    if (isDuplicate) {
      toast.error(
        `Variable with name "${updatedVariable.name}" already exists.`
      );
      return;
    }

    if (index === null) {
      addVariable(updatedVariable);
      setNewVariableName('');
      setNewVariableValue('');
    } else {
      updateVariable(index, updatedVariable);
    }
  };

  return (
    <section className={variables}>
      <h1 className='maintext maintext_green'>Variables</h1>
      <div className={`${variables__container} ${variables__add}`}>
        <table className={variables__table}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  className={variables__input}
                  type='text'
                  placeholder='Variable Name'
                  value={newVariableName}
                  onChange={(e) => setNewVariableName(e.target.value)}
                />
              </th>
              <th>
                <input
                  className={variables__input}
                  type='text'
                  placeholder='Variable Value'
                  value={newVariableValue}
                  onChange={(e) => setNewVariableValue(e.target.value)}
                />
              </th>
              <th>
                <button
                  className={`button ${button_border}`}
                  type='button'
                  onClick={() =>
                    handleVariableChange(null, {
                      name: newVariableName,
                      value: newVariableValue,
                    })
                  }
                >
                  Add
                </button>
              </th>
            </tr>
            {storedVariables.map((variable, index) => (
              <tr key={index}>
                <td>
                  <input
                    className={variables__input}
                    type='text'
                    value={variable.name}
                    onChange={(e) =>
                      handleVariableChange(index, {
                        ...variable,
                        name: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    className={variables__input}
                    type='text'
                    value={variable.value}
                    onChange={(e) =>
                      handleVariableChange(index, {
                        ...variable,
                        value: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    type='button'
                    className={`button ${button_border}`}
                    onClick={() => removeVariable(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
