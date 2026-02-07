"use client";
import { useEffect } from "react";

export default function BaselineStatus({ featureId }: { featureId: string }) {
  useEffect(() => {
    import("baseline-status");
  }, []);

  return <baseline-status featureId={featureId} />;
}
