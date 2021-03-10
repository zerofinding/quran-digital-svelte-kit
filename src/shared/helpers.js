// svelte summit 2020
import { writable, get } from 'svelte/store'
import fetch from 'cross-fetch'

import store from '../stores.js'
let stores

const cacheDatas = new Map()

export function getDatas(rest, id = null) {
  stores = get(store)
  const localstore = writable(new Promise(() => {}))

  let url
  if (isNaN(parseInt(id))) {
    url = rest
  } else {
    url = rest + id
  }

  const handleTitle = (id, fields) => {
    if (isNaN(parseInt(id))) {
      store.setSurah(fields)
      store.setTitle('SvelteKit - Home')
    } else {
      store.setTitle('SvelteKit - Surah ' + fields.name.transliteration.id)
    }
  }

  const handleSearch = (fields) => {
    return fields.filter(field => {
      return field.name.transliteration.id.toLowerCase().match(stores.search.toLowerCase());
    })
  }

  if (cacheDatas.has(url)) {
    const cacheCurrent = cacheDatas.get(url)
    handleTitle(id, cacheCurrent)

    if (stores.search !== '' && isNaN(parseInt(id))) {
      const datas = handleSearch(cacheCurrent)
      localstore.set(Promise.resolve(datas))
    } else {
      localstore.set(Promise.resolve(cacheDatas.get(url)))
    }

    return localstore
  }

  const load = async () => {
    try {
      const responses = await fetch(url)
      if (responses.status >= 400) {
        throw new Error("Bad response from server");
      }

      const resp = await responses.json()

      if (responses.ok) {
        handleTitle(id, resp.data)

        let datas = resp.data
        if (stores.search !== '' && isNaN(parseInt(id))) {
          datas = handleSearch(resp.data)
        }

        cacheDatas.set(url, datas)
        localstore.set(Promise.resolve(datas))
      }
    } catch (err) {
      console.log(err);
    }
  }

  load()
  return localstore
}
