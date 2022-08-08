import create from 'zustand';
import {persist} from 'zustand/middleware'

export default create(persist((set, get) => ({
  isLoggedIn: false,
  favorites: [],
  setIsLoggedIn: (isLoggedIn) => {
    set({isLoggedIn});
  },
  addToFavorites: (pair) => {
    const {favorites} = get();

    set({
      favorites: [...favorites, pair]
    })
  },

  removeFromFavorites: (pair) => {
    const {favorites} = get();

    if (favorites.includes(pair)) {
      const favoritesCopy = [...favorites];
      favoritesCopy.splice(favoritesCopy.indexOf(pair), 1);
      set({
        favorites: favoritesCopy
      })
    }
  },
  
  isFavorite: (pair) => {
    const {favorites} = get();
    return favorites.includes(pair)
  }
})));