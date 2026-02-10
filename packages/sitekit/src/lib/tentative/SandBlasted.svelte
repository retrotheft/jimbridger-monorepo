<script>
  let {
    baseFrequency = 0.5,
    numOctaves = 4,
    opacity = 0.15,
    base = '#201e1c',
    children
  } = $props();

  const s = 400

  let svg = $derived(
    `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="${s}" height="${s}" filter="url(#noise)" opacity="1"/>
      </svg>`
    )}`
  );
</script>

<div
  class="sandblasted"
  style:--noise-svg="url('{svg}')"
  style:--noise-opacity={opacity}
  style:--base={base}
>
  {@render children()}
</div>

<style>
  .sandblasted {
    width: 100%;
    height: 100%;
    background: var(--base);
    position: relative;
  }

  .sandblasted::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--noise-svg) repeat;
    mix-blend-mode: overlay;
    opacity: var(--noise-opacity);
    pointer-events: none;
  }
</style>
