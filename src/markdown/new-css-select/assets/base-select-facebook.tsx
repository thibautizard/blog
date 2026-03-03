"use client";
import "./base-select-facebook.css";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import FacebookReactionAngry from "../assets/icons/facebook-reactions/facebook-reaction-angry.png";
import FacebookReactionHeart from "../assets/icons/facebook-reactions/facebook-reaction-heart.png";
import FacebookReactionLaugh from "../assets/icons/facebook-reactions/facebook-reaction-laugh.png";
import FacebookReactionSad from "../assets/icons/facebook-reactions/facebook-reaction-sad.png";
import FacebookReactionSurprised from "../assets/icons/facebook-reactions/facebook-reaction-surprised.png";
import FacebookReactionThumb from "../assets/icons/facebook-reactions/facebook-reaction-thumb.png";
import FacebookSelect from "./images/facebook-select.gif";

import { SelectFallback } from "./select-fallback";

function BaseSelectFacebook() {
  const supportBaseSelect =
    typeof CSS !== "undefined" && CSS.supports("appearance", "base-select");
  if (!supportBaseSelect)
    return (
      <SelectFallback>
        {" "}
        <Image
          alt="Sélecteur horizontal de réactions inspiré de Facebook en pur HTML et CSS"
          className="mx-auto mt-4"
          height={300}
          src={FacebookSelect}
          width={500}
        />{" "}
      </SelectFallback>
    );
  return (
    <div className="mx-auto my-10 w-fit">
      <select
        className="custom-select-facebook cursor-pointer rounded-md border border-gray-300 py-1"
        id="facebook-select"
      >
        <button className="flex items-center justify-center" type="button">
          {/* @ts-ignore */}
          <selectedcontent />
        </button>

        <div className="reactions">
          <Option src={FacebookReactionThumb} value="thumb" />
          <Option src={FacebookReactionHeart} value="heart" />
          <Option src={FacebookReactionLaugh} value="laugh" />
          <Option src={FacebookReactionSad} value="sad" />
          <Option src={FacebookReactionAngry} value="angry" />
          <Option src={FacebookReactionSurprised} value="surprised" />
        </div>
      </select>
    </div>
  );
}

// ==========================================
function Option({ src, value }: { src: StaticImageData; value: string }) {
  return (
    <option
      className={cn(
        // "group",
        // "flex items-start",
        // "px-2",
        // "mx-2",
        // "rounded-[6px]",
        // "animate-colors",
        // "hover:bg-[rgba(129,139,152,.1)]",
        // "max-w-75"
      )}
      value={value}
    >
      <Image alt="Facebook reaction" height={30} src={src} width={30} />
    </option>
  );
}

export default BaseSelectFacebook;
