export const injectStyles = (color: string) => (node: HTMLElement) => {
   node.textContent = `:root {
      --color: ${color};
      --_bg-color: oklch(from ${color} 50% .09 h / 1);
      --_hl-color: oklch(from ${color} 80% .16 h / 1);
   }`
}
