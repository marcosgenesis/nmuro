import {create} from 'zustand'
export type Tab = 'home' | 'config'
interface NavbarState {
  tab: Tab
  setTab: (tab: Tab) => void
}

export const useNavbar = create<NavbarState>((set) => ({
  tab: 'home',
  setTab: (tab) => set(() => ({tab})),
}))
