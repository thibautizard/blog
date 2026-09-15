"use client";
import { useEffect } from "react";

export default function BaselineStatus({ featureId }: { featureId: string }) {
  useEffect(() => {
    import("baseline-status");
  }, []);

  return (
    <div className="my-4 rounded-md border border-slate-300 px-6 py-5">
      <baseline-status featureId={featureId} />
    </div>
  );
}
