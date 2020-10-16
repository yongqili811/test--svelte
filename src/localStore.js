import { writable } from 'svelte/store';

export const localStore = (key, initial) => {
  // receives the key of the local storage and an initial value
  const toString = (value) => JSON.stringify(value, null, 2); // helper function
  const toObj = JSON.parse;

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, toString(initial));
  }

  const saved = toObj(localStorage.getItem(key));
  const { subscribe, set, update } = writable(saved);

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem(key, toString(value)); // save also to local storage as a string
      return set(value);
    },
    update,
  };
};
