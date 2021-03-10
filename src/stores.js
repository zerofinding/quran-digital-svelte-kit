import { writable } from 'svelte/store';

const state = {
  api: 'https://api.quran.sutanlab.id/surah/',
  title: 'SvltDev - #SvelteKit',
  surah: '',
  search: '',
  isRender: false
}

const { subscribe, update } = writable(state)

const setTitle = payload => update(state => {
  state.title = payload
  return state
})

const setSearch = payload => update(state => {
  state.search = payload
  return state
})

const setSurah = payload => update(state => {
  state.surah = payload
  return state
})

export default {
  subscribe,
  setTitle,
  setSearch,
  setSurah
}
