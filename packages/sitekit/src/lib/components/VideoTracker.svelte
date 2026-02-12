<script lang="ts">
   const videos = [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
</script>

<p>My goal for the year is to release 26 videos about stuff I create. Here's how I'm doing:</p>
<ul>
   {#each videos as video}
      <li class={`${video}`}></li>
   {/each}
</ul>

<style>
   ul {
      padding-inline-start: 0;
      display: grid;
      grid-template-columns: repeat(13, 1fr);
      grid-template-rows: 1fr 1fr;
      gap: 0.5em 0;
      margin-inline: auto;
   }

   li {
      list-style-type: none;
      border: 1px solid var(--_color, transparent);
      aspect-ratio: 1;
      height: 1em;
   }

   :global(li.true) {
      --_color: lightgreen;
      background-color: var(--_color);
   }

   :global(li.false) {
      border-color: lightcoral;
   }
</style>
