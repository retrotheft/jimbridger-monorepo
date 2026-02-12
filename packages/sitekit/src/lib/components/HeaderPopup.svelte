<script lang="ts">
   let { children } = $props()
</script>

<div class="popup">
   {@render children?.()}
</div>

<style>
   div.popup {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid oklch(from var(--bg-color, black) 0 0 / 0.2);
      background: oklch(15% 0 0 / 0.5);
      min-width: 100%;
      min-height: 2lh;
      padding: 1em;
   }

   :global(.right div.popup) {
      left: unset;
      right: 0;
   }

   :global(.has-popup:hover > .popup) {
      display: grid;
   }
</style>
