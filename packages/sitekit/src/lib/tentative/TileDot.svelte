<script>
  let { size = 5, radius = 1, fill = '#FFFFFF09', gradient = 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 33%, rgba(0,0,0,0.7) 100%)' } = $props();

  let svg = $derived(
    `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
        <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="${fill}"/>
      </svg>`
    )}`
  );
</script>

<div
  class="dotfield"
  style:--dot-svg="url('{svg}')"
  style:--dot-size="{size}px"
  style:--dot-gradient={gradient}
>
   Hello there
</div>

<style>
  .dotfield {
    width: 100%;
    height: 100%;
    background: var(--dot-svg) repeat, var(--dot-gradient);
    background-size: var(--dot-size) var(--dot-size), cover;
    border: 1px solid #444;
    border-radius: 1em;
    display: grid;
    place-items: center;
  }
</style>
