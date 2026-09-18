"use client";

import { Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CopyIcon } from "./copy-icon";

interface Props {
  code: string;
}

function CopyButton({ code }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Clipboard access denied (insecure context, permissions): leave the icon as is
    }
  }, [code]);

  return (
    <button
      aria-label="Copier le code"
      className="copy-button"
      data-copied={copied || undefined}
      onClick={copy}
      type="button"
    >
      {copied ? <Check size={14} /> : <CopyIcon size={14} />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copié !" : ""}
      </span>
    </button>
  );
}

export default CopyButton;
