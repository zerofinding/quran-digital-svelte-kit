<script>
  import { fly } from 'svelte/transition'

  import store from '../stores.js'
  
  import { getDatas } from '$shared/helpers.js'
  let response = getDatas($store.api)

  const handleSurah = (e) => {
    store.setSearch(e.target.value.toLowerCase())
    response = getDatas($store.api)
    e.target.select()
  }
</script>

<div style="margin: auto;">
  <input
  id="search"
  list="surah"
  placeholder="Cari Surah.."
  value={$store.search}
  on:keydown={(e) => e.key === 'Enter' && handleSurah(e)} />
  <datalist id="surah">
    {#each $store.surah as data, idx}
    <option value={data.name.transliteration.id}>
    {/each}
  </datalist>
</div>

{#await $response}
<h1 class="full-width orange-bg">Loading..</h1>
{:then datas}
<div class="flex-container">

  {#each datas as data, idx}
    <div
    class="rounded"
    in:fly="{{ y: 50, delay: 25 + idx * 50 }}">
      <span style="color: #fff">{data.name.short}</span><br>
      <a href="/surah/{data.number}">{data.number}. {data.name.transliteration.id}</a><br>
      <span style="color: #fff">{data.name.translation.id}</span>
    </div>
  {/each}

</div>
{:catch}
<h1 class="full-width orange-bg">Error..</h1>
{/await}

<style>
input, button {
  font-family: inherit;
  font-size: inherit;
  color: #ff3e00;
  background-color: rgba(255, 62, 0, 0.1);
  border-radius: 2em;
  border: 2px solid #fff;
  outline: none;
  font-variant-numeric: tabular-nums;
  width: 95%;
  padding: 1em 0px 1em 15px;
}

input:focus {
  border: 2px solid #ff3e00;
}

.flex-container {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>