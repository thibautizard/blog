import Link from 'next/link'
import { Avatar } from '@base-ui-components/react/avatar'
import { Tooltip } from '@base-ui-components/react/tooltip'

import ProfilePicture from '../_assets/pp.png'

export const Header = () => (
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-montserrat font-bold tracking-tighter">
      <Link href="/">frenchdev</Link>
    </h1>
    <div className="flex items-center gap-3">
      <span className="font-merriweather italic">by</span>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Avatar.Root className="rounded-full">
            <Avatar.Image
              className="rounded-full size-10 object-cover"
              src={ProfilePicture.src}
              width="48"
              height="48"
            />
            <Avatar.Fallback className="size-10">TI</Avatar.Fallback>
          </Avatar.Root>
        </Tooltip.Trigger>
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
)
