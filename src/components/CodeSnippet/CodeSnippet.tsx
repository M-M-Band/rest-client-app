'use client';

import codeGen from 'postman-code-generators';
import sdk from 'postman-collection';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nnfxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeSnippet = () => {
  const targets = [
    { key: 'curl', variants: ['cURL'] },
    { key: 'csharp', variants: ['HttpClient', 'RestSharp'] },
    { key: 'java', variants: ['OkHttp', 'Unirest'] },
    { key: 'javascript', variants: ['Fetch', 'XHR'] },
    { key: 'nodejs', variants: ['Axios', 'Native', 'Request', 'Unirest'] },
    { key: 'python', variants: ['http.client', 'Requests'] },
    { key: 'go', variants: ['Native'] },
  ];
  const [selectedTargetVar, setSelectedTargetVar] = useState(
    targets[0].variants[0]
  );
  const [selectedTargetKey, setSelectedTargetKey] = useState(targets[0].key);
  const [output, setOutput] = useState<string>('');
  const request = new sdk.Request('http://mockbin.com/request');
  const options = {
    indentCount: 3,
    indentType: 'Space',
    trimRequestBody: true,
    followRedirect: true,
  };
  const convert = () => {
    codeGen.convert(
      selectedTargetKey,
      selectedTargetVar,
      request,
      options,
      function (error: Error | null, snippet: string) {
        if (error) {
          throw new Error(error.message);
        }
        setOutput(snippet);
      }
    );
  };

  useEffect(() => {
    convert();
  }, [selectedTargetVar, selectedTargetKey]);

  return (
    <>
      <div>
        <select
          onChange={(e: BaseSyntheticEvent) => {
            const targetValue = e.target.value;
            setSelectedTargetKey(targetValue);

            const selectedItem = targets.find(
              (item) => item.key === targetValue
            );
            if (selectedItem && selectedItem.variants.length > 0) {
              setSelectedTargetVar(selectedItem.variants[0]);
            }
          }}
          defaultValue={selectedTargetKey}
        >
          {targets.map((item) => {
            return <option key={item.key}>{item.key}</option>;
          })}
        </select>
        <select
          onChange={(e: BaseSyntheticEvent) =>
            setSelectedTargetVar(e.target.value)
          }
          defaultValue={selectedTargetVar}
        >
          {targets.map((item) => {
            if (item.key === selectedTargetKey) {
              return item.variants.map((variant) => (
                <option key={variant}>{variant}</option>
              ));
            }
            return null;
          })}
        </select>
      </div>
      <div>
        <SyntaxHighlighter
          language={selectedTargetKey}
          wrapLongLines={true}
          style={nnfxDark}
          customStyle={{
            backgroundColor: 'transparent',
            padding: '20px',
            border: '1px solid var(--black-700)',
          }}
        >
          {output}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default CodeSnippet;
