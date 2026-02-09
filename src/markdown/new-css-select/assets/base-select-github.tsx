"use client";
import "./base-select-github.css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GithubSelect from "./images/github-select.gif";
import { SelectFallback } from "./select-fallback";

function BaseSelectGithub() {
  const supportBaseSelect =
    typeof CSS !== "undefined" && CSS.supports("appearance", "base-select");
  if (!supportBaseSelect)
    return (
      <SelectFallback>
        {" "}
        <Image
          alt="Base Select"
          className="mx-auto mt-4"
          height={300}
          src={GithubSelect}
          width={500}
        />{" "}
      </SelectFallback>
    );
  return (
    <div className="mx-auto my-10 flex max-w-50 flex-col gap-2">
      <select
        className="custom-select-github cursor-pointer rounded-md border border-gray-300 py-1"
        id="select"
      >
        <button
          className="flex w-full items-center justify-between"
          type="button"
        >
          {/* @ts-ignore */}
          <selectedcontent className="flex items-center gap-x-2" />
          {/* Separator */}
          <div className="mr-2 ml-auto h-full w-px bg-[rgba(31,35,40,0.15)]" />
          {/* ⬇️ Arrow */}
          <svg
            aria-hidden="true"
            display="inline-block"
            fill="currentColor"
            focusable="false"
            height="16"
            overflow="visible"
            viewBox="0 0 16 16"
            width="16"
          >
            <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z" />
          </svg>
        </button>

        <div>
          <Option
            description="All commits from this branch will be added to
          the base branch via a merge commit."
            title="Create a merge commit"
          />
          <Option
            description="The 1 commit from this branch will be added
            to the base branch."
            title="Squash and merge"
          />
          <Option
            description="The 1 commit from this branch will be rebased
            and added to the base branch."
            title="Rebase and merge"
          />
        </div>
      </select>
    </div>
  );
}

// ==========================================
function Option({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <option
      className={cn(
        "group",
        "flex items-start",
        "px-2",
        "mx-2",
        "rounded-[6px]",
        "animate-colors",
        "hover:bg-[rgba(129,139,152,.1)]",
        "max-w-75"
      )}
      value="merge-commit"
    >
      <div
        className={cn(
          "flex flex-col",
          "py-2",
          "relative",
          "border-t border-t-[#DFE4E9]",
          "group-first-of-type:border-t-transparent",
          "hover:border-t-transparent"
        )}
      >
        <span
          className={cn(
            "option-title",
            "font-family font-semibold text-[#1f2328] text-[14px]"
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "option-description",
            "mt-0.5",
            "whitespace-normal",
            "font-base text-[#59636e] text-[12px]",
            "leading-tight"
          )}
        >
          {description}
        </span>
      </div>
    </option>
  );
}

export default BaseSelectGithub;
