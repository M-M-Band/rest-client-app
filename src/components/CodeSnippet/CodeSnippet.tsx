'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import codeGen from 'postman-code-generators';
import sdk, {
  RequestBodyDefinition,
  RequestDefinition,
} from 'postman-collection';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const headers = Array.from(searchParams.entries()).map(([key, value]) => {
    return { key, value };
  });

  const parsePathname = () => {
    const pathnameFragments = pathname.split('/');
    return {
      method: pathnameFragments[4],
      url: pathnameFragments[5]
        ? Buffer.from(pathnameFragments[5], 'base64').toString()
        : '',
      body: pathnameFragments[6]
        ? Buffer.from(pathnameFragments[6], 'base64').toString()
        : undefined,
    };
  };

  const requestBody: RequestBodyDefinition | undefined = parsePathname().body
    ? {
        mode: 'raw',
        raw: parsePathname().body,
      }
    : undefined;
  const requestObject: string | RequestDefinition = {
    url: parsePathname().url,
    method: parsePathname().method,
    header: headers,
    body: requestBody,
  };
  const request = new sdk.Request(requestObject);

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
  }, [selectedTargetVar, selectedTargetKey, pathname, searchParams]);

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
          style={monokai}
          customStyle={{
            padding: '15px',
          }}
        >
          {output}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default CodeSnippet;
