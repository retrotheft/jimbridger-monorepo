import { createContext } from "svelte"
import { type Sheet } from "$lib/classes/Sheet.svelte"

type Local = {
   save: (sheet: Sheet) => void,
   initialValue: any
}

export const [ getLocalContext, setLocalContext ] = createContext<Local>()
