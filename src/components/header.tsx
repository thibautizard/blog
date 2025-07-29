import { Avatar } from "@base-ui-components/react/avatar";
import { Tooltip } from "@base-ui-components/react/tooltip";
import Link from "next/link";
import { SparklesText } from "@/components/magicui/sparkles-text";

const url = "https://api.github.com/users/thibautizard";

const profilePictureUrl = await fetch(url)
	.then((response) => response.json())
	.then((data) => {
		const profilePictureUrl = data.avatar_url;
		return profilePictureUrl;
	})
	.catch((error) => console.error("Error fetching user data:", error))
	.finally(() => {
		return "https://avatars.githubusercontent.com/u/22802349?v=4";
	});

export const Header = () => (
	<div className="select-none mb-12 flex justify-between items-center">
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

var FrenchDev = (
	<SparklesText
		sparklesCount={10}
		className="grid"
		colors={{ first: "#3b82f6", second: "#a855f7" }}
	>
		<h1 className="text-2xl select-none font-montserrat font-bold tracking-tighter pr-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
			<Link href="/posts">frenchdev</Link>
		</h1>
	</SparklesText>
);

var PP = (
	<Avatar.Root className="rounded-full">
		<Avatar.Image
			className="rounded-full size-10 object-cover"
			src={profilePictureUrl}
			width="48"
			height="48"
			alt="Thibaut Izard GitHub profile picture"
		/>
		<Avatar.Fallback className="size-10">TI</Avatar.Fallback>
	</Avatar.Root>
);
