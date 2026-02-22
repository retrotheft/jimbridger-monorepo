<script lang="ts">
   let { dateString = new Date() } = $props()

   const date = $derived(new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Melbourne",
      year: "numeric",
      month: "long",
      day: "numeric",
   }).format(new Date(dateString)))
</script>

<span class="date-display">{date}</span>
