export function load({ platform }) {
   return {
      kvMode: platform?.env?.KV_MODE ?? 'unknown'
   }
}
