import { createContext } from "svelte";

type CsvComparison = {
   compare: (r: number, c: number, value: string) => boolean
}

export const [ getCsvComparisonContext, setCsvComparisonContext ] = createContext<CsvComparison>()
