"use client";
import "./base-select.css";
import Image from "next/image";
import BaseSelectGif from "./images/base-select.gif";
import { SelectFallback } from "./select-fallback";

function BaseSelect() {
  const supportBaseSelect =
    typeof CSS !== "undefined" && CSS.supports("appearance", "base-select");
  if (!supportBaseSelect)
    return (
      <SelectFallback>
        {" "}
        <Image
          alt="Base Select"
          className="mx-auto mt-4"
          height={150}
          src={BaseSelectGif}
          width={250}
        />{" "}
      </SelectFallback>
    );

  return (
    <div className="custom-select mx-auto my-10 flex max-w-55 flex-col gap-2">
      <label className="font-bold text-decoration-underline" htmlFor="select">
        <span>Un {`${"<select>"}`} customisable </span>
      </label>
      <select
        className="custom-select rounded-md border border-gray-300 py-1"
        id="select"
      >
        <option value="1">Apple 🍎</option>
        <option value="2">Banana 🍌</option>
        <option value="3">Cherry 🍒</option>
        <option value="4">Grape 🍇</option>
        <option value="5">Blueberry 🫐</option>
        <option value="9">Kiwi 🥝</option>
        <option value="10">Lemon 🍋</option>
      </select>
    </div>
  );
}

export default BaseSelect;
