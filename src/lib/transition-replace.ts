"use client";
import { useRouter } from "next/navigation";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useTransitionReplaceNavigation = () => {
  const router = useRouter();

  const transitionReplaceTo = async (href: string) => {
    const body = document.querySelector("body");

    body?.classList.add("page-transition");

    await sleep(500);
    router.replace(href);
    await sleep(500);

    body?.classList.remove("page-transition");
  };

  return { transitionReplaceTo };
};