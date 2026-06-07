import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders AI/assistant text as formatted markdown so things like **bold**
 * show up as real bold text instead of literal asterisks ("stars").
 */
export function ChatMarkdown({ text }: { text: string }) {
  return (
    <div className="chat-md leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-gold">{children}</strong>,
          ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pr-5 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pr-5 last:mb-0">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          h1: ({ children }) => <h3 className="mb-2 text-base font-bold text-gold">{children}</h3>,
          h2: ({ children }) => <h3 className="mb-2 text-base font-bold text-gold">{children}</h3>,
          h3: ({ children }) => <h4 className="mb-1.5 font-bold text-gold">{children}</h4>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noreferrer" className="text-gold underline">
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-white/10 px-1 py-0.5 text-[0.85em]">{children}</code>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}