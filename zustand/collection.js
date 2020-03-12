import create from 'zustand';

const [useZ] = create((set, get) => ({
  selectedIndex: null,
  setSelectedIndex: selectedIndex => {
    set({selectedIndex});
  },
}));

export default useZ;
