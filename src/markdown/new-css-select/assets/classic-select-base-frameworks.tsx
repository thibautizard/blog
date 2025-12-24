import "./classic-select-base-frameworks.css";
import AngularIcon from "./icons/angular";
import VueIcon from "./icons/vue";
import ReactIcon from "./icons/react";
function ClassicSelectBaseFrameworks() {
  return (
    <div className="mx-auto my-10 flex max-w-50 flex-col gap-2">
      <label className="font-bold text-decoration-underline" htmlFor="select">
        <span>Un {`${"<select>"}`} "basé" 🤙</span>
      </label>
      <select
        className="rounded-md border border-gray-300 py-1 custom-select-frameworks"
        id="select"
      >
        <button>
          <div>
            <selectedcontent> </selectedcontent>
            <svg title="arrow" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="m7 10l5 5l5-5z" />
            </svg>
          </div>
        </button>

        <div>
          <option value="react" className="flex gap-x-2">
            <div className="size-4">
              <ReactIcon />
            </div>
            <span>React</span>
          </option>
          <option value="vue" className="flex gap-x-2">
            <div className="size-4">
              <VueIcon />
            </div>
            <span>Vue</span>
          </option>
          <option value="angular" className="flex gap-x-2">
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

export default ClassicSelectBaseFrameworks;
