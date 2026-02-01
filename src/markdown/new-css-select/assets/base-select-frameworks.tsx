import "./base-select-frameworks.css";
import AngularIcon from "./icons/angular";
import ReactIcon from "./icons/react";
import VueIcon from "./icons/vue";

function BaseSelectFrameworks() {
  return (
    <div className="mx-auto my-10 flex max-w-50 flex-col gap-2">
      <label className="font-bold text-decoration-underline" htmlFor="select">
        <span>Un {`${"<select>"}`} "basé" 🤙</span>
      </label>
      <select
        className="custom-select-frameworks rounded-md border border-gray-300 py-1"
        id="select"
      >
        <button type="button">
          <div>
            {/*<selectedcontent> </selectedcontent>*/}
            <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24">
              <path d="m7 10l5 5l5-5z" fill="currentColor" />
            </svg>
          </div>
        </button>

        <div>
          <option className="flex gap-x-2" value="react">
            <div className="size-4">
              <ReactIcon />
            </div>
            <span>React</span>
          </option>
          <option className="flex gap-x-2" value="vue">
            <div className="size-4">
              <VueIcon />
            </div>
            <span>Vue</span>
          </option>
          <option className="flex gap-x-2" value="angular">
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
