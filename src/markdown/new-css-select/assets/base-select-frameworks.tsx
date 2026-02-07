import "./base-select-frameworks.css";
import { cn } from "@/lib/utils";
import AngularIcon from "./icons/angular";
import ReactIcon from "./icons/react";
import VueIcon from "./icons/vue";

function BaseSelectFrameworks() {
  const optionClassname = cn(
    "flex gap-x-2",
    "animate-colors",
    "hover:bg-gray-50!"
  );

  return (
    <div className="mx-auto my-10 flex max-w-50 flex-col gap-2">
      <select
        className="custom-select-frameworks cursor-pointer rounded-md border border-gray-300 py-1"
        id="select"
      >
        <button
          className="flex w-full items-center justify-between"
          type="button"
        >
          {/* @ts-ignore */}
          <selectedcontent className="flex items-center gap-x-2" />
          {/* ⬇️ Arrow */}
          <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24">
            <path d="m7 10l5 5l5-5z" fill="currentColor" />
          </svg>
        </button>

        <div>
          <option className={optionClassname} value="react">
            <div className="size-4">
              <ReactIcon />
            </div>
            <span>React</span>
          </option>
          <option className={optionClassname} value="vue">
            <div className="size-4">
              <VueIcon />
            </div>
            <span>Vue</span>
          </option>
          <option className={optionClassname} value="angular">
            <div className="size-4">
              <AngularIcon />
            </div>
            <span>Angular</span>
          </option>
        </div>
      </select>
    </div>
  );
}

export default BaseSelectFrameworks;
