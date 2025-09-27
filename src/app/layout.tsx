import { Tooltip } from "@base-ui-components/react/tooltip";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { DM_Sans, Mona_Sans, Montserrat } from "next/font/google";
import { Header } from "../components/header";

import "./global.css";

const monaSans = Mona_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "900"],
	display: "swap",
	variable: "--font-mona-sans",
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "900"],
	display: "swap",
	variable: "--font-montserrat",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-dm-sans",
});

export const metadata: Metadata = {
	description: "Blog personnel de Thibaut Izard",
	title: "frenchdev",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props;

	return (
		<html
			lang="fr"
			className={`${montserrat.variable} ${dmSans.variable} ${monaSans.variable}`}
		>
			<body>
				<div className="root min-h-screen mx-auto p-4 sm:p-8 max-w-[75ch] space-y-8">
					<Tooltip.Provider>
						<Header />
						<main className="space-y-8">{children}</main>
					</Tooltip.Provider>
				</div>
				<Analytics />
			</body>
		</html>
	);
}
