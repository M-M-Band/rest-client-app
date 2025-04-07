'use client';

import { useState } from 'react';

import styles from './Variables.module.css';
import { useVariables } from '@/context/VariablesContext';

const {
  variables,
  variables__container,
  variables__list,
  variables__item,
  variables__input,
  variables__button,
  variables__button_remove,
  variables__add,
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
        <h2>Add New Variable</h2>
        <input
          className={variables__input}
          type='text'
          placeholder='Variable Name'
          value={newVariableName}
          onChange={(e) => setNewVariableName(e.target.value)}
        />
        <input
          className={variables__input}
          type='text'
          placeholder='Variable Value'
          value={newVariableValue}
          onChange={(e) => setNewVariableValue(e.target.value)}
        />
        <button
          className={variables__button}
          onClick={handleAddVariable}
        >
          Add
        </button>
      </div>
      <div className={variables__container}>
        <h2>Existing Variables</h2>
        <ul className={variables__list}>
          {storedVariables.map((variable, index) => (
            <li
              key={index}
              className={variables__item}
            >
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
              <button
                className={`${variables__button} ${variables__button_remove}`}
                onClick={() => removeVariable(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
