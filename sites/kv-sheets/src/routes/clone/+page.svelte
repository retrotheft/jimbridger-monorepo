<script lang="ts">

   const nested = { message: "hello there "}

   let value = $state({ nested })

   let clone = $state.snapshot(value)

   nested.message = "General Kenobi"

   // let clone = structuredClone(value)

   // console.log(value)
   console.log(clone)
</script>
