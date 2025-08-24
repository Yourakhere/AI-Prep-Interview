import React, { useState } from 'react'
import { LuCopy, LuCheck, LuCode } from 'react-icons/lu'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

const AIResponsePreview = ({ content }) => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Full screen scrollable response box */}
      <div className="max-h-[85vh] overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-cyan-50 0 rounded-xl p-6 border border-gray-900 shadow-inner">
        <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <CodeBlock
                    code={String(children).replace(/\n$/, '')}
                    language={match[1]}
                  />
                ) : (
                  <code className="bg-gray-100 px-1 py-0.5 rounded" {...props}>
                    {children}
                  </code>
                )
              },
              p({ children }) {
                return <p className="mb-4 leading-6">{children}</p>
              },
              strong({ children }) {
                return <strong>{children}</strong>
              },
              em({ children }) {
                return <em>{children}</em>
              },
              ul({ children }) {
                return <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
              },
              ol({ children }) {
                return <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>
              },
              li({ children }) {
                return <li className="mb-1">{children}</li>
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">
                    {children}
                  </blockquote>
                )
              },
              h1({ children }) {
                return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>
              },
              h2({ children }) {
                return <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>
              },
              h3({ children }) {
                return <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3>
              },
              h4({ children }) {
                return <h4 className="text-base font-bold mt-4 mb-2">{children}</h4>
              },
              a({ href, children }) {
                return (
                  <a href={href} className="text-blue-600 hover:underline">
                    {children}
                  </a>
                )
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-3">
                    <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                      {children}
                    </table>
                  </div>
                )
              },
              thead({ children }) {
                return <thead className="bg-gray-50">{children}</thead>
              },
              tbody({ children }) {
                return <tbody className="divide-y divide-gray-200">{children}</tbody>
              },
              tr({ children }) {
                return <tr>{children}</tr>
              },
              th({ children }) {
                return (
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    {children}
                  </th>
                )
              },
              td({ children }) {
                return <td className="px-3 py-2 whitespace-nowrap text-sm">{children}</td>
              },
              hr() {
                return <hr className="my-6 border-gray-200" />
              },
              img({ src, alt }) {
                return <img src={src} alt={alt} className="my-4 max-w-full rounded" />
              }
            }}
          >
            {content || 'No answer available yet.'}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-md border bg-gray-50 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-gray-700">
          <LuCode size={16} />
          <span className="text-sm font-medium">{language || 'Code'}</span>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1 px-2 py-1 text-xs rounded-md border bg-white hover:bg-gray-100"
          aria-label="Copy code"
        >
          {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <SyntaxHighlighter
        language={language || 'javascript'}
        style={oneLight}
        wrapLongLines
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1rem',
          fontSize: '0.9rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default AIResponsePreview
