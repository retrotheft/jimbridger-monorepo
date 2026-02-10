<script lang="ts">
  let {
    // Fine layer (base texture)
    fineSize = 3,
    fineRadius = 0.5,
    fineFill = '#FFFFFF06',
    // Coarse layer (surface grain)
    coarseSize = 6,
    coarseRadius = 1,
    coarseFill = '#FFFFFF09',
    // Shared
    gradient = 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 33%, rgba(0,0,0,0.7) 100%)',
    // gradient = 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 33%, rgba(0,0,0,1) 100%)',
    children
  } = $props();

  function makeSvg(size: number, radius: number, fill: string) {
    return `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
        <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="${fill}"/>
      </svg>`
    )}`;
  }

  let fineSvg = $derived(makeSvg(fineSize, fineRadius, fineFill));
  let coarseSvg = $derived(makeSvg(coarseSize, coarseRadius, coarseFill));
</script>

<div
  class="dotfield"
  style:--fine-svg="url('{fineSvg}')"
  style:--fine-size="{fineSize}px"
  style:--coarse-svg="url('{coarseSvg}')"
  style:--coarse-size="{coarseSize}px"
  style:--dot-gradient={gradient}
>
  {@render children?.()}
</div>

<style>
  .dotfield {
    background:
      var(--fine-svg) repeat,
      var(--coarse-svg) repeat,
      var(--dot-gradient);
    background-size:
      var(--fine-size) var(--fine-size),
      var(--coarse-size) var(--coarse-size),
      cover;
    /*border: 1px solid #000;*/
    /*border-radius: 1em;*/
    display: grid;
    background-color: rgba(0,0,0,0.2);
  }
</style>
