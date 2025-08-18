import { AlertTriangle, BadgeCheck, Hourglass, Info, X } from "lucide-react";
import styles from "./badge-old.module.css";

type Props = {
	status: "pending" | "success" | "error" | "warning" | "info" | "default";
};

export default function BadgeOld({ status }: Props) {
	return (
		<div className={styles.badge} data-status={status}>
			{status === "pending" && <Hourglass size={15} />}
			{status === "success" && <BadgeCheck size={15} />}
			{status === "error" && <X size={15} />}
			{status === "warning" && <AlertTriangle size={15} />}
			{status === "info" && <Info size={15} />}
			<span className={styles.status}>{status}</span>
		</div>
	);
}
