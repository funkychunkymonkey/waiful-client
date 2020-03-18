import create from 'zustand';
import AsyncStorage from '@react-native-community/async-storage';

const [useZ] = create((set, get) => ({
  // data
  location: null,
  setLocation: location => {
    set({location});
  },
  isRunning: false,
  setIsRunning: isRunning => set({isRunning}),
  currentRun: null,
  setCurrentRun: currentRun => {
    set({currentRun, isRunning: !!currentRun});
    if (currentRun) {
      AsyncStorage.setItem('currentRun', JSON.stringify(currentRun));
    } else {
      AsyncStorage.removeItem('currentRun');
    }
  },
  // utility
  addCoords: coords => {
    if (!get().currentRun) return;
    const currentRun = {...get().currentRun};
    currentRun.data = [...currentRun.data, coords];
    currentRun.distance += 25;
    get().setCurrentRun(currentRun);
  },
}));

export default useZ;
