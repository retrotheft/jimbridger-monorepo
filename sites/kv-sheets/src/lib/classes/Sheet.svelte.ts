import type { Metadata, SheetInitialValue } from "$lib/types"

const defaultInitialValue: SheetInitialValue = {
   value: '',
   metadata: {
      fields: ['field-1']
   }
}

export class Sheet {
   public data = $state<string[][]>([[]])
   public metadata = $state<Metadata>({ fields: [] })

   constructor(public key: string, local?: SheetInitialValue, remote?: SheetInitialValue) {
      const initial = local ?? remote ?? defaultInitialValue
      this.data = Sheet.dataFromCsv(initial.value)
      this.metadata = initial.metadata
   }

   addRow() {
      const newRow = this.metadata.fields.map(f => '')
      this.data.push(newRow)
   }

   removeRow(index: number) {
      this.data.splice(index, 1)
   }

   addField(name?: string) {
      const { fields } = this.metadata
      this.metadata.fields.push(name ?? `field-${fields.length}`)
      this.data.forEach(row => {
         row.push('')
      })
   }

   removeField(index: number) {
      this.metadata.fields.splice(index, 1)
      this.data.forEach(row => {
         row.splice(index, 1)
      })
   }

   cell(r: number, c: number) {
     return this.data[r][c]
   }

   get csv() {
      return Sheet.csvFromData(this.data)
   }

   get value() {
      return this.csv
   }

   get snapshot() {
      return $state.snapshot(this.data)
   }

   get KVData() {
      const { key, value, metadata } = this
      return { key, value, metadata: { ...metadata, lastSaved: Date.now() } }
   }

   static dataFromCsv(csv: string) {
      return csv.split('\n').map(r => r.split(','))
   }

   static csvFromData(data: string[][]) {
      return data.map(r => r.join(',')).join('\n')
   }
}
