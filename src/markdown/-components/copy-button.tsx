"use client";

import { Check } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CopyIcon, type CopyIconHandle } from "./copy-icon";

interface Props {
  code: string;
}

function CopyButton({ code }: Props) {
  const [copied, setCopied] = useState(false);
  const iconRef = useRef<CopyIconHandle | null>(null);

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

  // The icon is unmounted while the check mark is shown, hence the null checks
  const animateIcon = useCallback(() => iconRef.current?.startAnimation(), []);
  const resetIcon = useCallback(() => iconRef.current?.stopAnimation(), []);

  return (
    <button
      aria-label="Copier le code"
      className="copy-button"
      data-copied={copied || undefined}
      onClick={copy}
      onMouseEnter={animateIcon}
      onMouseLeave={resetIcon}
      type="button"
    >
      {copied ? <Check size={14} /> : <CopyIcon ref={iconRef} size={14} />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copié !" : ""}
      </span>
    </button>
  );
}

export default CopyButton;
