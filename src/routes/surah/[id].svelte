<script>
  import { fly } from 'svelte/transition'
  import { page } from '$app/stores';

  const id = parseInt($page.params.id)
  
  import { getDatas } from '$shared/helpers.js'
  const surah = getDatas('https://api.quran.sutanlab.id/surah/', id)

  let prevSurah = (id - 1 < 1) ? 1 : (id - 1)
  let nextSurah = (id + 1 > 114) ? 114 : (id + 1)
</script>

<nav>
  <a href="/">Home</a>
  <a class="{$page.path === '/surah/' + prevSurah ? 'selected' : undefined}" href="/surah/{prevSurah}">Prev</a>
  <a class="{$page.path === '/surah/' + nextSurah ? 'selected' : undefined}" href="/surah/{nextSurah}">Next</a>
</nav>

{#await $surah}
<h1 class="full-width orange-bg">Loading..</h1>
{:then datas}
<h1 class="full-width orange-bg">{datas.number}. {datas.name.transliteration.id}</h1>

<div class="flex-container">
{#each datas.verses as data, idx}
  
    <div
    class="rounded"
    in:fly="{{ y: 50, delay: 25 + idx * 50 }}">
      <div style="text-align: right;">
      <h2 style="color: #fff">{data.text.arab}</h2>
      <span style="color: #ff3e00">{data.text.transliteration.en} .{data.number.inSurah}</span>
      </div>
      <div style="text-align: left;">
        <span style="color: #fff">{data.translation.id}</span>
      </div>
    </div>
  
{/each}
</div>
{:catch}
<h1 class="full-width orange-bg">Error..</h1>
{/await}

<style>
.orange-bg {
  background-color: #ff3e00;
  color: black;
}

.flex-container {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
