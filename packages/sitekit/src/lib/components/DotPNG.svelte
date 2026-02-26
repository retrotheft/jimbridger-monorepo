<script lang="ts">
   let { children } = $props();
</script>

<div class="dotfield">
   {@render children?.()}
</div>

<style>
   .dotfield {
      --_bg-color: var(--bg-color, rgba(0,0,0,0.2));
      background:
         url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAEklEQVR4nGNgQAf///9nwxAEADxXAwRHZ/rOAAAAAElFTkSuQmCC') repeat,
         url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAFklEQVR4nGNgIBv8//+fE4SJlyAaAACRjwwZE7xdcwAAAABJRU5ErkJggg==') repeat;
      background-size: 3px 3px, 6px 6px;
      background-color: var(--_bg-color);
      background-attachment: fixed;
      min-height: 100%;
      will-change: transform;
      transform: translateZ(0);
   }
</style>
