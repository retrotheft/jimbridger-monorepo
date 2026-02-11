<script lang="ts">
   let { ...classProps } = $props();

   const joinClasses = () =>Object.keys(classProps).join(" ")
</script>

<div class={joinClasses()}>Hello there</div>
