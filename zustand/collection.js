import create from 'zustand';

const [useZ] = create((set, get) => ({
  selectedIndex: 0,
  setSelectedIndex: selectedIndex => set({selectedIndex}),
  waifu: null,
  setWaifu: waifu => set({waifu}),
}));

export default useZ;
