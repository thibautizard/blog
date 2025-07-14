import { Avatar } from "@base-ui-components/react/avatar";
import { Tooltip } from "@base-ui-components/react/tooltip";
import Link from "next/link";
import ProfilePicture from "@/assets/pp.jpeg";
import { SparklesText } from "@/components/magicui/sparkles-text";

const FrenchDev = (
	<SparklesText
		sparklesCount={10}
		colors={{ first: "#3b82f6", second: "#a855f7" }}
	>
		<h1 className="text-2xl font-montserrat font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
			<Link href="/posts">frenchdev</Link>
		</h1>
	</SparklesText>
);

const PP = (
	<Avatar.Root className="rounded-full">
		<Avatar.Image
			className="rounded-full size-10 object-cover"
			src={ProfilePicture.src}
			width="48"
			height="48"
		/>
		<Avatar.Fallback className="size-10">TI</Avatar.Fallback>
	</Avatar.Root>
);

export const Header = () => (
	<div className="flex justify-between items-center">
		{FrenchDev}
		<div className="flex items-center gap-3">
			<span className="font-merriweather italic">by</span>
			<Tooltip.Root>
				<Tooltip.Trigger>{PP}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Positioner sideOffset={10}>
						<Tooltip.Popup className="text-xs font-serif border border-gray-200 rounded-md p-2">
							<Tooltip.Arrow className="fill-current" />
							<span>Thibaut Izard</span>
						</Tooltip.Popup>
					</Tooltip.Positioner>
				</Tooltip.Portal>
			</Tooltip.Root>
		</div>
	</div>
);
