import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="bg-neutral-100 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] rounded-3xl p-4 animate-pulse">
      <div className="w-full aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-2xl mb-4"></div>
      <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
        <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
        <div className="h-8 bg-red-600/30 rounded-xl w-1/4"></div>
      </div>
    </div>
  );
};

export const GlobalPageLoader = () => {
  return (
    <div className="page-progress" role="status" aria-label="Loading page">
      <span />
    </div>
  );
};
