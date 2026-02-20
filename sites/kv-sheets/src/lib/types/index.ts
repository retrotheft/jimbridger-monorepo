export type Metadata = {
   fields: string[]
   lastSaved?: number,
}

export type SheetInitialValue = {
   value: string,
   metadata: Metadata,
   cacheStatus?: any
}
