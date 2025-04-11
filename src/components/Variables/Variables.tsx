'use client';

import { useState } from 'react';

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

  const handleAddVariable = () => {
    if (newVariableName && newVariableValue) {
      addVariable({ name: newVariableName, value: newVariableValue });
      setNewVariableName('');
      setNewVariableValue('');
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
                  onClick={handleAddVariable}
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
                      updateVariable(index, {
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
                      updateVariable(index, {
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
