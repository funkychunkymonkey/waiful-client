import create from 'zustand';

const [useZ] = create((set, get) => ({
  series: [],
  setSeries: series => set({series}),
  malType: 'anime',
  setMalType: malType => set({malType}),
}));

export default useZ;
