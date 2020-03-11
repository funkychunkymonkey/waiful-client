import create from 'zustand';
import utils from '../utils';
import Geolocation from '@react-native-community/geolocation';

const [useZ] = create((set, get) => ({
  currentRun: null,
  setCurrentRun: currentRun => set({currentRun}),
  panel: 'LOADING',
  setPanel: panel => set({panel}),
  location: null,
  setLocation: location => set({location}),
  routeData: [],
  distance: 0,
  addCoords: coords =>
    set({
      routeData: [...get().routeData, coords],
      distance: get().distance + 25,
    }),
  startRun: () => {
    set({panel: 'LOADING'});
    utils.startRun().then(data => {
      set({panel: 'RUNNING', currentRun: data});
    });
    Geolocation.getCurrentPosition(position => {
      set({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          distanceTravelled: 0,
          prevLatLng: {},
        },
      });
      error => {
        console.log(error.code, error.message);
      };
    });
  },
  endRun: () => {
    set({panel: 'LOADING'});
    utils.stopRun(get().distance, get().routeData).then(data => {
      console.log('RUN STOP', data);
      set({panel: 'WAITING', currentRun: data});
    });
  },
}));

export default useZ;
