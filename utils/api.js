import { AsyncStorage } from 'react-native'

export const UDACI_CARDS_STORAGE_KEY = 'UdaciCards'

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(UDACI_CARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function getEntrys () {
    return AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
          });
        });
      });
  }

export function removeEntry (key) {
  return AsyncStorage.getItem(UDACI_CARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}