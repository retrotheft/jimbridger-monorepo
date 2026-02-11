import { createContext } from "svelte";

type LayoutContext = {
   setColor: (color: string) => void
}

export const [ getLayoutContext, setLayoutContext ] = createContext<LayoutContext>()
