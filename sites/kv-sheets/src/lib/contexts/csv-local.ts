import { createContext } from "svelte"

type CsvLocal = {
   save: (workingCopy: string[][]) => void
}

export const [ getCsvLocalContext, setCsvLocalContext ] = createContext<CsvLocal>()
