import { Avatar } from "@base-ui-components/react/avatar";
import { Tooltip } from "@base-ui-components/react/tooltip";

const url = "https://api.github.com/users/thibautizard";
const DEFAULT_PROFILE_PICTURE_URL =
  "https://avatars.githubusercontent.com/u/22802349?v=4";

const profilePictureUrl = await fetch(url)
  .then((response) => response.json())
  .then((data) => data.avatar_url)
  .finally(() => DEFAULT_PROFILE_PICTURE_URL);

// ---------------------------------
export function GithubProfilePicture() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <PP />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={10}>
          <Tooltip.Popup className="rounded-md border border-gray-200 p-2 font-bold font-gluten text-sm shadow">
            <Tooltip.Arrow className="fill-current" />
            <span>🙆‍♂️ Thibaut Izard</span>
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function PP() {
  return (
    <a
      href="https://github.com/thibautizard"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Avatar.Root className="rounded-full">
        <Avatar.Image
          alt="Thibaut Izard GitHub profile picture"
          className="size-10 rounded-full object-cover"
          height="48"
          src={profilePictureUrl}
          width="48"
        />
        <Avatar.Fallback className="size-10">TI</Avatar.Fallback>
      </Avatar.Root>
    </a>
  );
}
