import type { Sheet } from "$lib/classes/Sheet.svelte";
import { createContext } from "svelte";

type Remote = {
   compare: (r: number, c: number, value: string) => boolean,
   initialValue: any,
   save: (sheet: Sheet) => void
}

export const [ getRemoteContext, setRemoteContext ] = createContext<Remote>()
