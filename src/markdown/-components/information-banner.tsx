import { BadgeInfo, OctagonAlert } from "lucide-react";

interface Props {
  children: React.ReactNode;
  status?: "info" | "success" | "warning" | "error";
}

function InformationBanner({ children, status = "info" }: Props) {
  return (
    <div className="insert" data-status={status}>
      {children}
      <div className="icon-container">
        {status === "info" && <BadgeInfo className="inline-block" />}
        {status === "success" && <OctagonAlert className="inline-block" />}
        {status === "warning" && <OctagonAlert className="inline-block" />}
        {status === "error" && <OctagonAlert className="inline-block" />}
      </div>
    </div>
  );
}

export default InformationBanner;
