
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Unable to copy code:", error);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#1e1e1e]">
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
        <span className="text-sm capitalize text-slate-300">
          {language}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-700"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "20px",
          background: "#1e1e1e",
          fontSize: "14px"
        }}
        wrapLongLines
      >
        {code || ""}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
