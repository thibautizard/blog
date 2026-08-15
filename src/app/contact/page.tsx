import { MailAtSign01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Page() {
  return (
    <div className="flex items-center gap-x-2">
      <MailIcon />
      <p className="leading-none">
        Vous pouvez me contacter à l'adresse suivante :{" "}
        <a
          className="underline decoration-blue-600"
          href="mailto:thibaut.izard@gmail.com"
        >
          thibaut.izard@gmail.com
        </a>
      </p>
    </div>
  );
}

function MailIcon() {
  return (
    <HugeiconsIcon
      className="mbs-0.5"
      color="currentColor"
      icon={MailAtSign01Icon}
      size={19}
      strokeWidth={1.5}
    />
  );
}
