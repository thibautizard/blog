import { BadgeInfo } from "lucide-react";

type Props = {
	children: React.ReactNode;
};

function InformationBanner({ children }: Props) {
	return (
		<div className="insert" data-status="info">
			{children}
			<div className="icon-container">
				<BadgeInfo className="inline-block" />
			</div>
		</div>
	);
}

export default InformationBanner;
