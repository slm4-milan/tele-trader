import create from 'zustand';
import { persist } from 'zustand/middleware'

export default create(persist((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => {
		set({isLoggedIn});
	}
})));