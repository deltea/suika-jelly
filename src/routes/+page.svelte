<script lang="ts">
  import { onMount } from "svelte";
  import { main } from "$lib/index";
  onMount(main);
</script>

<main
  class="h-screen bg-background text-primary flex justify-center items-center"        
  id="container"
></main>
